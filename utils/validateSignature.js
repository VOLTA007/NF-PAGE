import crypto from 'crypto';

export default function validateSignature(query, secret) {
  // Build the query string excluding 'signature' and 'mode' parameters
  const queryString = Object.entries(query)
    .filter(([key]) => key !== 'signature' && key !== 'mode')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  // Remove leading '&' if present
  const finalUrl = queryString.startsWith('&') ? queryString.slice(1) : queryString;

  // Generate the hash
  const signature = crypto.createHmac('sha256', secret).update(finalUrl).digest('hex');

  // Compare generated hash with provided signature
  return signature === query.signature;
}
