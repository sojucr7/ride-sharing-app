import * as jose from 'jose'
import { cookies } from 'next/headers'
import connect from "./app/db/connect";
import User from "./app/models/User";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/api/rides')) {

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    const jwt =request.cookies.get('token')!.value
    
    try{
      const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
        issuer: 'urn:example:issuer',
        audience: 'urn:example:audience',
      })
    }
    catch(e){
      return NextResponse.json({ error:'unAuthorized' }, { status: 401 });
    }   
  }
  return NextResponse.next();
}
