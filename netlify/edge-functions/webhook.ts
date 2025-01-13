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

export default async function handler(request: Request, context: Context) {
  if (request.method !== 'POST') {
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

  try {
    const data: MeshulamWebhookData = await request.json();

    // Log the transaction
    console.log('Payment received:', {
      transactionCode: data.transactionCode,
      amount: data.paymentSum,
      customer: {
        name: data.fullName,
        email: data.payerEmail,
        phone: data.payerPhone
      }
    });

    // Return JSON response
    return new Response(JSON.stringify({
      success: true,
      transaction: {
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
          }
        },
        meta: {
          source: data.paymentSource,
          pageTitle: data.purchasePageTitle,
          reference: data.asmachta
        }
      }
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