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
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Parse the webhook data
    const data: MeshulamWebhookData = await request.json();

    // Validate webhook key (you should store this in environment variables)
    if (data.webhookKey !== process.env.MESHULAM_WEBHOOK_KEY) {
      return new Response('Invalid webhook key', { status: 401 });
    }

    // Log the transaction (you can extend this to store in a database)
    console.log('Payment received:', {
      transactionCode: data.transactionCode,
      amount: data.paymentSum,
      customer: {
        name: data.fullName,
        email: data.payerEmail,
        phone: data.payerPhone
      },
      payment: {
        type: data.paymentType,
        date: data.paymentDate,
        card: {
          brand: data.cardBrand,
          suffix: data.cardSuffix,
          type: data.cardType
        }
      }
    });

    // Send email notification (you would implement this)
    // await sendPaymentNotification(data);

    // Return success response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}