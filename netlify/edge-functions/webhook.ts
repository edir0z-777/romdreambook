import { Context } from '@netlify/edge-functions';

interface MeshulamWebhookData {
  err: string;
  status: string;
  data: {
    asmachta: string;
    cardSuffix: string;
    cardType: string;
    cardTypeCode: string;
    cardBrand: string;
    cardBrandCode: string;
    cardExp: string;
    firstPaymentSum: string;
    periodicalPaymentSum: string;
    status: string;
    statusCode: string;
    transactionTypeId: string;
    paymentType: string;
    sum: string;
    paymentsNum: string;
    allPaymentsNum: string;
    paymentDate: string;
    description: string;
    fullName: string;
    payerPhone: string;
    payerEmail: string;
    transactionId: string;
    transactionToken: string;
    paymentLinkProcessId: string;
    paymentLinkProcessToken: string;
    invoice_license_number: string;
    invoice_name: string;
    address: string;
    processId: string;
    processToken: string;
    productData: Array<{
      product_id: string;
      name: string;
      catalog_number: string;
      vat: string;
      quantity: string;
      price: string;
      price_mark: string;
    }>;
    dynamicFields: Array<{
      key: string;
      label: string;
      option_label: string;
      option_key: string;
      field_value: string;
    }>;
  };
}

// Helper function to parse form data into nested structure
function parseFormData(formData: URLSearchParams): MeshulamWebhookData {
  const result: any = {
    err: formData.get('err') || '',
    status: formData.get('status') || '',
    data: {}
  };

  // Create a map to store arrays
  const arrays: Record<string, any[]> = {
    productData: [],
    dynamicFields: []
  };

  // Process all form fields
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('data[')) {
      const match = key.match(/data\[([^\]]+)\](?:\[(\d+)\])?\[([^\]]+)\]/);
      if (match) {
        const [, section, index, field] = match;
        
        if (index !== undefined) {
          // Handle array fields (productData and dynamicFields)
          if (!arrays[section]) {
            arrays[section] = [];
          }
          const idx = parseInt(index);
          if (!arrays[section][idx]) {
            arrays[section][idx] = {};
          }
          arrays[section][idx][field] = value;
        } else {
          // Handle regular fields
          result.data[section] = value;
        }
      } else {
        // Handle simple data fields
        const simpleMatch = key.match(/data\[([^\]]+)\]/);
        if (simpleMatch) {
          result.data[simpleMatch[1]] = value;
        }
      }
    }
  }

  // Add arrays to result
  result.data.productData = arrays.productData;
  result.data.dynamicFields = arrays.dynamicFields;

  return result as MeshulamWebhookData;
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
      const webhookData = parseFormData(formData);
      
      // Log parsed data
      console.log('Parsed webhook data:', JSON.stringify(webhookData, null, 2));

      // Generate a unique transaction ID
      const transactionId = crypto.randomUUID();

      // Store transaction in memory with normalized structure
      const transaction = {
        id: transactionId,
        amount: Number(webhookData.data.sum),
        date: new Date().toISOString(),
        customer: {
          name: webhookData.data.fullName,
          email: webhookData.data.payerEmail,
          phone: webhookData.data.payerPhone,
          address: webhookData.data.address
        },
        payment: {
          type: 'credit_card',
          card: {
            brand: webhookData.data.cardBrand,
            suffix: webhookData.data.cardSuffix,
            type: webhookData.data.cardType
          },
          details: {
            paymentsNum: Number(webhookData.data.paymentsNum),
            firstPayment: Number(webhookData.data.firstPaymentSum),
            periodicalPayment: Number(webhookData.data.periodicalPaymentSum)
          }
        },
        products: webhookData.data.productData.map(product => ({
          name: product.name,
          quantity: Number(product.quantity),
          price: Number(product.price)
        })),
        customFields: webhookData.data.dynamicFields.reduce((acc, field) => {
          acc[field.label] = field.field_value;
          return acc;
        }, {} as Record<string, string>),
        meta: {
          reference: webhookData.data.asmachta,
          status: webhookData.data.status || 'אושרה',
          processId: webhookData.data.processId
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