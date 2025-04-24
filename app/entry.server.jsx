import { RemixServer } from '@remix-run/react';
import { handleRequest } from '@vercel/remix';

export default function (
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    <RemixServer context={remixContext} url={request.url} />
  );
}
