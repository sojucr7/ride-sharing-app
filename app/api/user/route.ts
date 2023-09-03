import User from "../../models/User";
import connect from "../../db/connect";
import Schema from "../../models/Schema";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  try {
    await connect();
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    let validation = Schema.validate({ name, email, password });
    if (validation.error) {
      return NextResponse.json(validation.error.details, { status: 422 });
    }

    const user = await new User({ name, email, password }).save();
    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    return NextResponse.json(error, { status: 500 });
  }
}
