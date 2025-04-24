import { createRequestHandler } from "@remix-run/netlify";
import * as build from "@remix-run/dev/server-build";

export default createRequestHandler({ build });
