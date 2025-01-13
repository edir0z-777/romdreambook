import { Context } from '@netlify/edge-functions';

// List of valid payment domains
const VALID_PAYMENT_DOMAINS = [
  'pay.grow.link',
  'meshulam.co.il',
  'sdk.meshulam.co.il',
  'cdn.meshulam.co.il',
  'pps.creditguard.co.il',
  'challenges.cloudflare.com'
];

export default async function transform(request: Request, context: Context) {
  const url = new URL(request.url);
  
  // Only process thank you page requests
  if (url.pathname === '/thank-you') {
    const referer = request.headers.get('referer') || '';
    const isValidReferer = VALID_PAYMENT_DOMAINS.some(domain => referer.includes(domain));
    
    // If not coming from a valid payment domain, redirect to home
    if (!isValidReferer) {
      return Response.redirect(`${url.origin}/`, 302);
    }

    const response = await context.next();
    const contentType = response.headers.get('content-type') || '';

    // Only process HTML responses
    if (contentType.includes('text/html')) {
      const html = await response.text();
      const validationToken = crypto.randomUUID();
      
      // Add validation token and script
      const modifiedHtml = html.replace(
        '</head>',
        `<meta name="validation-token" content="${validationToken}">
        <script>
          window.sessionStorage.setItem('thank-you-token', '${validationToken}');
        </script>
        </head>`
      );

      // Create new response with modified HTML
      return new Response(modifiedHtml, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'no-store, must-revalidate',
          'x-robots-tag': 'noindex'
        }
      });
    }

    return response;
  }

  return context.next();
}