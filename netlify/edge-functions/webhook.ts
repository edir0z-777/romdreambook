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
      // Parse URL-encoded form data
      const formData = await request.formData();
      const data = Object.fromEntries(formData);

      // Convert the string data to our expected format
      const webhookData = {
        err: data.err || '',
        status: data.status || '',
        data: {
          asmachta: data.asmachta || '',
          cardSuffix: data.cardSuffix || '',
          cardType: data.cardType || '',
          cardBrand: data.cardBrand || '',
          status: data.status || 'אושרה',
          sum: data.sum || '0',
          paymentsNum: data.paymentsNum || '1',
          firstPaymentSum: data.firstPaymentSum || '0',
          periodicalPaymentSum: data.periodicalPaymentSum || '0',
          paymentDate: data.paymentDate || new Date().toISOString(),
          fullName: data.fullName || '',
          payerPhone: data.payerPhone || '',
          payerEmail: data.payerEmail || '',
          transactionId: data.transactionId || crypto.randomUUID(),
          address: data.address || '',
          processId: data.processId || ''
        }
      };

      // Store transaction in memory with normalized structure
      const transaction = {
        id: webhookData.data.transactionId,
        amount: Number(webhookData.data.sum),
        date: webhookData.data.paymentDate,
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
        meta: {
          reference: webhookData.data.asmachta,
          status: webhookData.data.status,
          processId: webhookData.data.processId
        }
      };

      transactionStore.set(webhookData.data.transactionId, transaction);

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