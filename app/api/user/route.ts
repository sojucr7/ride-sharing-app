import { NextResponse } from "next/server";
import connect from "../../db/connect";
import User from "../../models/User";

export async function GET() {
  await connect();
  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  try {
    await connect();
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");
    const user = await new User({ email, password }).save();
    return NextResponse.json({
      _id: user._id,
      email: user.email,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
