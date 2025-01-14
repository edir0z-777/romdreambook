import { Context } from '@netlify/edge-functions';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
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
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  shipping: {
    type: string;
    amount: number;
  };
  customFields: Record<string, string>;
  meta: {
    reference: string;
    status: string;
    processId: string;
  };
}

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(request: Request, context: Context) {
  try {
    const url = new URL(request.url);
    const transactionId = url.searchParams.get('id');

    if (!transactionId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Transaction ID is required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, must-revalidate',
          'X-Robots-Tag': 'noindex'
        }
      });
    }

    // Add a delay to simulate processing
    await delay(2000);

    // Fetch transaction from webhook endpoint
    const response = await fetch(`${url.origin}/api/webhook?id=${transactionId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch transaction');
    }

    const data = await response.json();

    if (!data.success || !data.transaction) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Transaction not found'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, must-revalidate',
          'X-Robots-Tag': 'noindex'
        }
      });
    }

    // Validate transaction data structure
    const transaction = data.transaction as Transaction;

    return new Response(JSON.stringify({
      success: true,
      transaction
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
        'X-Robots-Tag': 'noindex'
      }
    });

  } catch (error) {
    console.error('Error loading transaction:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error loading transaction details'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
        'X-Robots-Tag': 'noindex'
      }
    });
  }
}