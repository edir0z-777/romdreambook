import { Context } from '@netlify/edge-functions';

export default async function transform(request: Request, context: Context) {
  const url = new URL(request.url);
  
  // Only process thank you page requests
  if (url.pathname === '/thank-you') {
    const referer = request.headers.get('referer') || '';
    const isFromPayment = referer.startsWith('https://pay.grow.link/');
    
    // If not coming from payment page, redirect to home
    if (!isFromPayment) {
      return Response.redirect(`${url.origin}/`, 302);
    }

    const response = await context.next();
    const contentType = response.headers.get('content-type') || '';

    // Only process HTML responses
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // Create new response with strict headers
      return new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'no-store, must-revalidate',
          'x-robots-tag': 'noindex',
          'referrer-policy': 'same-origin'
        }
      });
    }

    return response;
  }

  return context.next();
}