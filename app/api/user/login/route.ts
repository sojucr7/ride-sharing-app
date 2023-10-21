import bcrypt from "bcrypt";
import * as jose from 'jose'
import User from "../../../models/User";
import connect from "../../../db/connect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connect();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if(!user){
        return NextResponse.json({ error: "no user found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);


    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET,
    )
    
    const jwt = await new jose.SignJWT({ user_id: user._id, email,name:user.name })
      .setProtectedHeader({ alg:'HS256' })
      .setIssuedAt()
      .setIssuer('urn:example:issuer')
      .setAudience('urn:example:audience')
      .setExpirationTime('24h')
      .sign(secret)

    if (isMatch) {
      return Response.json({
        success: isMatch,
      },{ status: 200,headers: { 'Set-Cookie': `token=${jwt}; Path=/` }})
    }
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
