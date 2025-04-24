import { createRequestHandler } from '@vercel/remix';
import * as build from '../build/server';

export default createRequestHandler({ build });
