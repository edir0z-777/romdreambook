import { Context } from '@netlify/edge-functions';

function generateTransactionHtml(transaction: any) {
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>פרטי עסקה</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #4338ca;
            margin-bottom: 30px;
            text-align: center;
        }
        .section {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f8ff;
            border-radius: 8px;
        }
        .section h2 {
            color: #4338ca;
            margin-top: 0;
            margin-bottom: 15px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .field {
            margin-bottom: 10px;
        }
        .label {
            font-weight: bold;
            color: #666;
            margin-bottom: 4px;
        }
        .value {
            color: #333;
            font-size: 1.1em;
        }
        .success-badge {
            display: inline-block;
            background: #22c55e;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.9em;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>פרטי עסקה</h1>
        <div style="text-align: center">
            <div class="success-badge">העסקה הושלמה בהצלחה</div>
        </div>

        <div class="section">
            <h2>פרטי תשלום</h2>
            <div class="grid">
                <div class="field">
                    <div class="label">מספר עסקה</div>
                    <div class="value">${transaction.id}</div>
                </div>
                <div class="field">
                    <div class="label">סכום</div>
                    <div class="value">₪${transaction.amount}</div>
                </div>
                <div class="field">
                    <div class="label">תאריך</div>
                    <div class="value">${transaction.date}</div>
                </div>
                <div class="field">
                    <div class="label">סוג תשלום</div>
                    <div class="value">${transaction.payment.type}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>פרטי לקוח</h2>
            <div class="grid">
                <div class="field">
                    <div class="label">שם מלא</div>
                    <div class="value">${transaction.customer.name}</div>
                </div>
                <div class="field">
                    <div class="label">טלפון</div>
                    <div class="value">${transaction.customer.phone}</div>
                </div>
                <div class="field">
                    <div class="label">דוא״ל</div>
                    <div class="value">${transaction.customer.email}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>פרטי כרטיס</h2>
            <div class="grid">
                <div class="field">
                    <div class="label">סוג כרטיס</div>
                    <div class="value">${transaction.payment.card.brand}</div>
                </div>
                <div class="field">
                    <div class="label">4 ספרות אחרונות</div>
                    <div class="value">${transaction.payment.card.suffix}</div>
                </div>
                <div class="field">
                    <div class="label">סוג</div>
                    <div class="value">${transaction.payment.card.type}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>פרטים נוספים</h2>
            <div class="grid">
                <div class="field">
                    <div class="label">מקור התשלום</div>
                    <div class="value">${transaction.meta.source}</div>
                </div>
                <div class="field">
                    <div class="label">שם העמוד</div>
                    <div class="value">${transaction.meta.pageTitle}</div>
                </div>
                <div class="field">
                    <div class="label">אסמכתא</div>
                    <div class="value">${transaction.meta.reference}</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const transactionId = url.searchParams.get('id');

  if (!transactionId) {
    return new Response('Transaction ID is required', { status: 400 });
  }

  try {
    // Fetch transaction details from webhook response
    const response = await fetch(`${url.origin}/api/webhook/${transactionId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error('Transaction not found');
    }

    // Generate HTML view
    const html = generateTransactionHtml(data.transaction);

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    });

  } catch (error) {
    return new Response('Error loading transaction details', { status: 500 });
  }
}