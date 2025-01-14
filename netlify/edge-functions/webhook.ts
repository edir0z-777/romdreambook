import { Context } from '@netlify/edge-functions';

// Helper function to parse nested form data
function parseNestedFormData(formData: URLSearchParams): Record<string, any> {
  const result: Record<string, any> = {};

  // Parse all form fields
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('data[')) {
      // Extract nested path from data[x][y][z] format
      const path = key.slice(5, -1).split('][');
      let current = result;
      
      // Build nested structure
      for (let i = 0; i < path.length - 1; i++) {
        const segment = path[i];
        if (!current.data) {
          current.data = {};
        }
        if (!current.data[segment]) {
          current.data[segment] = segment.match(/^\d+$/) ? [] : {};
        }
        current = current.data[segment];
      }
      
      // Set the final value
      const lastKey = path[path.length - 1];
      current[lastKey] = value;
    } else {
      // Handle top-level fields
      result[key] = value;
    }
  }

  // Extract and normalize the data
  const {
    asmachta = '',
    cardSuffix = '',
    cardType = '',
    cardBrand = '',
    fullName = '',
    payerPhone = '',
    payerEmail = '',
    address = '',
    sum = '0',
    paymentsNum = '0',
    firstPaymentSum = '0',
    periodicalPaymentSum = '0',
    processId = '',
    status = ''
  } = result.data || {};

  // Extract product data
  const productData = [];
  let i = 0;
  while (result.data?.[`productData[${i}]`]) {
    const product = result.data[`productData[${i}]`];
    productData.push({
      product_id: product.product_id || '',
      name: product.name || '',
      quantity: product.quantity || '0',
      price: product.price || '0',
      vat: product.vat || '0'
    });
    i++;
  }

  // Extract dynamic fields
  const dynamicFields = [];
  i = 0;
  while (result.data?.[`dynamicFields[${i}]`]) {
    const field = result.data[`dynamicFields[${i}]`];
    dynamicFields.push({
      key: field.key || '',
      label: field.label || '',
      option_label: field.option_label || '',
      option_key: field.option_key || '',
      field_value: field.field_value || ''
    });
    i++;
  }

  return {
    err: result.err || '',
    status: result.status || '',
    data: {
      asmachta,
      cardSuffix,
      cardType,
      cardBrand,
      fullName,
      payerPhone,
      payerEmail,
      address,
      sum: Number(sum),
      paymentsNum: Number(paymentsNum),
      firstPaymentSum: Number(firstPaymentSum),
      periodicalPaymentSum: Number(periodicalPaymentSum),
      processId,
      status,
      productData,
      dynamicFields
    }
  };
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
      const webhookData = parseNestedFormData(formData);
      
      // Log parsed data
      console.log('Parsed webhook data:', JSON.stringify(webhookData, null, 2));

      // Generate a unique transaction ID
      const transactionId = crypto.randomUUID();
      
      // Extract product details
      const products = webhookData.data.productData.map((product: any) => ({
        name: product.name,
        quantity: Number(product.quantity),
        price: Number(product.price)
      }));

      // Extract custom fields
      const customFields = webhookData.data.dynamicFields.reduce((acc: Record<string, string>, field: any) => {
        acc[field.label] = field.field_value;
        return acc;
      }, {});

      // Store transaction in memory with normalized structure
      const transaction = {
        id: transactionId,
        amount: webhookData.data.sum,
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
            paymentsNum: webhookData.data.paymentsNum,
            firstPayment: webhookData.data.firstPaymentSum,
            periodicalPayment: webhookData.data.periodicalPaymentSum
          }
        },
        products,
        customFields,
        meta: {
          reference: webhookData.data.asmachta,
          status: 'אושרה',
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