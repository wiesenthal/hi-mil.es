// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { after } from 'next/server'
import { db } from "~/db";
import { requests } from './db/schema';

export function proxy(request: NextRequest) {
  // Your logic here (auth checks, redirects, etc.)

  after(async () => {
    const headersObj = Object.fromEntries(request.headers.entries());
    db.insert(requests).values({
      method: request.method,
      url: request.url,
      headers: headersObj,
      destination: String(request.destination),
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      mode: String(request.mode),
      credentials: String(request.credentials),
      cache: String(request.cache),
      redirect: String(request.redirect),
      integrity: request.integrity,
      keepalive: request.keepalive,
      ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
      userAgent: request.headers.get('user-agent') ?? null,
    })
  })

  console.log("Middleware");
  console.log("method:", request.method);
  console.log("url:", request.url);
  console.log("headers:", request.headers);
  console.log("destination:", request.destination);
  console.log("referrer:", request.referrer);
  console.log("referrerPolicy:", request.referrerPolicy);
  console.log("mode:", request.mode);
  console.log("credentials:", request.credentials);
  console.log("cache:", request.cache);
  console.log("redirect:", request.redirect);
  console.log("integrity:", request.integrity);
  console.log("keepalive:", request.keepalive);
  console.log("signal:", request.signal);

  return NextResponse.next()
}
