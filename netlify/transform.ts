import { Context } from '@netlify/edge-functions';

export default async function transform(request: Request, context: Context) {
  const response = await context.next();
  const clientIP = context.ip;

  // Only modify the thank you page
  if (request.url.includes('/thank-you')) {
    let html = await response.text();
    
    // Insert the meta tag right after the opening head tag
    html = html.replace(
      '<head>',
      `<head>\n    <meta name="client-ip" content="${clientIP}" />`
    );

    return new Response(html, {
      headers: response.headers,
    });
  }

  return response;
}