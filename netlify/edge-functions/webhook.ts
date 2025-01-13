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

// In-memory store for transactions
const transactionStore = new Map<string, any>();

export default async function handler(request: Request, context: Context) {
  // Handle GET requests to fetch transaction
  if (request.method === 'GET') {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response('Transaction ID is required', { status: 400 });
    }

    // Get transaction from memory store
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
      const data: MeshulamWebhookData = await request.json();

      // Store transaction in memory
      const transaction = {
        id: data.transactionCode,
        amount: data.paymentSum,
        date: data.paymentDate,
        customer_name: data.fullName,
        customer_email: data.payerEmail,
        customer_phone: data.payerPhone,
        payment_type: data.paymentType,
        card_brand: data.cardBrand,
        card_suffix: data.cardSuffix,
        card_type: data.cardType,
        payments_num: data.paymentsNum,
        first_payment: data.firstPaymentSum,
        periodical_payment: data.periodicalPaymentSum,
        source: data.paymentSource,
        page_title: data.purchasePageTitle,
        reference: data.asmachta,
        description: data.paymentDesc
      };

      transactionStore.set(data.transactionCode, transaction);

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