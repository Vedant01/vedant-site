import { PassThrough } from "stream";
import * as ReactDOMServer from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { Response } from "@remix-run/node";

export default function handleRequest(
  request,
  statusCode,
  headers,
  context
) {
  const stream = new PassThrough();

  ReactDOMServer.renderToPipeableStream(
    <RemixServer context={context} url={request.url} />,
    {
      onShellReady() {
        headers.set("Content-Type", "text/html");
        stream.write("<!DOCTYPE html>");
        stream.end();
      },
      onAllReady() {
        stream.end();
      },
      onError(error) {
        console.error(error);
      },
    }
  );

  return new Response(stream, {
    status: statusCode,
    headers,
  });
}