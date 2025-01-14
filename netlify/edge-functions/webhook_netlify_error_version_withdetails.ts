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
      const data: Record<string, string> = {};
      
      // Convert FormData to object and log each field
      for (const [key, value] of formData.entries()) {
        data[key] = value;
        console.log(`Form field ${key}:`, value);
      }

      // Generate a unique transaction ID if not provided
      const transactionId = data.transactionId || crypto.randomUUID();
      
      // Store transaction in memory with normalized structure
      const transaction = {
        id: transactionId,
        amount: Number(data.sum || 0),
        date: data.paymentDate || new Date().toISOString(),
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
        meta: {
          reference: data.asmachta || '',
          status: data.status || 'אושרה',
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