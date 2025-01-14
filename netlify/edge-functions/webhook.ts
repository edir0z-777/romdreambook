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
    productData: Array<{
      product_id: string;
      name: string;
      catalog_number: string;
      vat: string;
      quantity: string;
      price: string;
      price_mark: string;
    }>;
    shipping: {
      type: string;
      amount: string;
    };
    dynamicFields: Array<{
      key: string;
      label: string;
      option_label: string;
      option_key: string;
      field_value: string;
    }>;
    processId: string;
    processToken: string;
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
      const webhookData: MeshulamWebhookData = await request.json();
      const data = webhookData.data;

      // Store transaction in memory with normalized structure
      const transaction = {
        id: data.transactionId,
        amount: Number(data.sum),
        date: data.paymentDate,
        customer: {
          name: data.fullName,
          email: data.payerEmail,
          phone: data.payerPhone,
          address: data.address
        },
        payment: {
          type: data.paymentType,
          card: {
            brand: data.cardBrand,
            suffix: data.cardSuffix,
            type: data.cardType
          },
          details: {
            paymentsNum: Number(data.paymentsNum),
            firstPayment: Number(data.firstPaymentSum),
            periodicalPayment: Number(data.periodicalPaymentSum)
          }
        },
        products: data.productData.map(product => ({
          name: product.name,
          quantity: Number(product.quantity),
          price: Number(product.price)
        })),
        shipping: {
          type: data.shipping.type,
          amount: Number(data.shipping.amount)
        },
        customFields: data.dynamicFields.reduce((acc, field) => ({
          ...acc,
          [field.label]: field.field_value
        }), {}),
        meta: {
          reference: data.asmachta,
          status: data.status,
          processId: data.processId
        }
      };

      transactionStore.set(data.transactionId, transaction);

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
        error: 'Error processing webhook'
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