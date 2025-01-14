import { Context } from '@netlify/edge-functions';

// Helper function to parse nested form data
function parseNestedFormData(formData: URLSearchParams): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    // Handle array notation like productData[0][name]
    const matches = key.match(/^([^\[]+)(?:\[(\d+)\])?\[([^\]]+)\]$/);
    
    if (matches) {
      const [, arrayName, index, field] = matches;
      if (!result[arrayName]) {
        result[arrayName] = [];
      }
      const idx = Number(index);
      if (!result[arrayName][idx]) {
        result[arrayName][idx] = {};
      }
      result[arrayName][idx][field] = value;
    } else {
      // Regular fields
      result[key] = value;
    }
  }

  // Clean up arrays (remove empty indices)
  for (const key in result) {
    if (Array.isArray(result[key])) {
      result[key] = result[key].filter(Boolean);
    }
  }

  return result;
}

// In-memory store for transactions
const transactionStore = new Map<string, any>();

export default async function handler(request: Request, context: Context) {
  // Handle GET requests to fetch transaction(s)
  if (request.method === 'GET') {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    // If no ID is provided, return all transactions
    if (!id) {
      const transactions = Array.from(transactionStore.values());
      return new Response(JSON.stringify({
        success: true,
        transactions,
        count: transactions.length
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, must-revalidate'
        }
      });
    }

    // Get specific transaction from memory store
    const transaction = transactionStore.get(id);

    if (!transaction) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Transaction not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      transaction
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Handle POST requests for new transactions
  if (request.method === 'POST') {
    try {
      // Get the raw body first
      const rawBody = await request.text();
      console.log('Raw webhook body:', rawBody);

      // Parse URL-encoded form data
      const formData = new URLSearchParams(rawBody);
      const data = parseNestedFormData(formData);
      
      // Log parsed data
      console.log('Parsed webhook data:', JSON.stringify(data, null, 2));

      // Generate a unique transaction ID if not provided
      const transactionId = crypto.randomUUID();
      
      // Extract product details
      const products = data.productData?.map((product: any) => ({
        name: product.name,
        quantity: Number(product.quantity),
        price: Number(product.price)
      })) || [];

      // Calculate total amount from products
      const totalAmount = products.reduce((sum: number, product: any) => {
        return sum + (product.price * product.quantity);
      }, 0);

      // Extract custom fields
      const customFields = data.dynamicFields?.reduce((acc: Record<string, string>, field: any) => {
        acc[field.label] = field.field_value;
        return acc;
      }, {}) || {};

      // Store transaction in memory with normalized structure
      const transaction = {
        id: transactionId,
        amount: totalAmount,
        date: new Date().toISOString(),
        customer: {
          name: data.fullName || '',
          email: data.payerEmail || '',
          phone: data.payerPhone || '',
          address: data.address || ''
        },
        payment: {
          type: 'credit_card',
          card: {
            brand: data.cardBrand || '',
            suffix: data.cardSuffix || '',
            type: data.cardType || ''
          },
          details: {
            paymentsNum: Number(data.paymentsNum || 1),
            firstPayment: Number(data.firstPaymentSum || 0),
            periodicalPayment: Number(data.periodicalPaymentSum || 0)
          }
        },
        products,
        customFields,
        meta: {
          reference: data.asmachta || '',
          status: 'אושרה',
          processId: data.processId || ''
        }
      };

      // Log the final transaction object
      console.log('Storing transaction:', JSON.stringify(transaction, null, 2));

      transactionStore.set(transactionId, transaction);

      return new Response(JSON.stringify({
        success: true,
        transaction
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Webhook error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Error processing webhook',
        details: error.message
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response(JSON.stringify({
    success: false,
    error: 'Method not allowed'
  }), { 
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}