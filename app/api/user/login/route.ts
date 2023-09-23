import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

    if (isMatch) {
      return NextResponse.json(
        {
          success: isMatch,
          token: jwt.sign({ user_id: user._id, email }, "siuuu", {
            expiresIn: "2h",
          }),
        },
        { status: 200 }
      );
    }
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
