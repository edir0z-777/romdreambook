import { Context } from '@netlify/edge-functions';

interface MeshulamWebhookData {
  webhookKey: string;
  transactionCode: string;
  transactionType: string;
  paymentSum: number;
  paymentsNum: number;
  allPaymentNum: number;
  firstPaymentSum: number;
  periodicalPaymentSum: number;
  paymentType: string;
  paymentDate: string;
  asmachta: string;
  paymentDesc: string;
  fullName: string;
  payerPhone: string;
  payerEmail: string;
  cardSuffix: string;
  cardBrand: string;
  cardType: string;
  paymentSource: string;
  purchasePageKey: string;
  purchasePageTitle: string;
  amount: number;
  purchaseCustomField: {
    field1: string;
    field2: string;
    field3: string;
  };
}

interface Transaction {
  id: string;
  amount: number;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  payment: {
    type: string;
    card: {
      brand: string;
      suffix: string;
      type: string;
    };
    details: {
      paymentsNum: number;
      firstPayment: number;
      periodicalPayment: number;
    };
  };
  meta: {
    source: string;
    pageTitle: string;
    reference: string;
    description: string;
    customFields: {
      field1: string;
      field2: string;
      field3: string;
    };
  };
}

// Store transactions in memory (note: this will reset on each deploy)
const transactions = new Map<string, Transaction>();

export default async function handler(request: Request, context: Context) {
  // Handle GET requests to fetch transaction
  if (request.method === 'GET') {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response('Transaction ID is required', { status: 400 });
    }

    const transaction = transactions.get(id);
    if (!transaction) {
      return new Response('Transaction not found', { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, transaction }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Handle POST requests for new transactions
  if (request.method === 'POST') {
    try {
      const data: MeshulamWebhookData = await request.json();

      // Create transaction object with full Meshulam data
      const transaction: Transaction = {
        id: data.transactionCode,
        amount: data.paymentSum,
        date: data.paymentDate,
        customer: {
          name: data.fullName,
          email: data.payerEmail,
          phone: data.payerPhone
        },
        payment: {
          type: data.paymentType,
          card: {
            brand: data.cardBrand,
            suffix: data.cardSuffix,
            type: data.cardType
          },
          details: {
            paymentsNum: data.paymentsNum,
            firstPayment: data.firstPaymentSum,
            periodicalPayment: data.periodicalPaymentSum
          }
        },
        meta: {
          source: data.paymentSource,
          pageTitle: data.purchasePageTitle,
          reference: data.asmachta,
          description: data.paymentDesc,
          customFields: data.purchaseCustomField
        }
      };

      // Store transaction
      transactions.set(transaction.id, transaction);

      // Log the transaction for debugging
      console.log('Payment received:', {
        transactionCode: data.transactionCode,
        amount: data.paymentSum,
        customer: {
          name: data.fullName,
          email: data.payerEmail,
          phone: data.payerPhone
        }
      });

      return new Response(JSON.stringify({
        success: true,
        transaction
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });

    } catch (error) {
      console.error('Webhook error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Error processing webhook'
      }), { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }

  return new Response(JSON.stringify({
    success: false,
    error: 'Method not allowed'
  }), { 
    status: 405,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}