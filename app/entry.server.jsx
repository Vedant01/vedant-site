import { RemixServer } from '@remix-run/react';


// Use PassThrough only if available (Node.js)
let PassThrough;
try {
  // Dynamically import stream for Node.js
  PassThrough = (await import('stream')).PassThrough;
} catch {}

const ABORT_DELAY = 5000;

// Helper to detect if we're in Vite dev (ESM) or Node.js prod (CommonJS)
function canUsePipeableStream() {
  try {
    // Try to import the Node.js-only API
    // This works in Node.js prod, fails in Vite dev
    const ReactDOMServer = require('react-dom/server');
    return typeof ReactDOMServer.renderToPipeableStream === 'function';
  } catch {
    return false;
  }
}

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  // Try Node.js streaming API first (prod)
  let ReactDOMServer;
  let usePipeableStream = false;
  try {
    ReactDOMServer = await import('react-dom/server');
    usePipeableStream = typeof ReactDOMServer.renderToPipeableStream === 'function';
  } catch {
    ReactDOMServer = await import('react-dom/server');
  }

  if (usePipeableStream && PassThrough) {
    // Node.js prod: use renderToPipeableStream
    return new Promise((resolve, reject) => {
      let didError = false;
      const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
        <RemixServer context={remixContext} url={request.url} />,
        {
          onShellReady() {
            const body = new PassThrough();
            responseHeaders.set('Content-Type', 'text/html');
            resolve(
              new Response(body, {
                status: didError ? 500 : responseStatusCode,
                headers: responseHeaders,
              })
            );
            pipe(body);
          },
          onShellError(error) {
            reject(error);
          },
          onError(error) {
            didError = true;
            console.error(error);
          },
        }
      );
      setTimeout(abort, ABORT_DELAY);
    });
  } else {
    // Vite dev: use renderToReadableStream (Web Streams API)
    const { renderToReadableStream } = ReactDOMServer;
    const stream = await renderToReadableStream(
      <RemixServer context={remixContext} url={request.url} />
    );
    responseHeaders.set('Content-Type', 'text/html');
    return new Response(stream, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  }
}
