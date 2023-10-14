import bcrypt from "bcrypt";
import User from "../../models/User";
import connect from "../../db/connect";
import { NextResponse } from "next/server";
import {createSchema} from "../../models/UserSchema";

export async function POST(request: Request) {
  try {
    await connect();

    const { name, email,password } = await request.json();

    let validation = createSchema.validate({ name, email, password },{abortEarly:false});

    if (validation.error) {
      return NextResponse.json({errors: validation.error.details.map((detail)=>{
        const obj:{[k: string]: string} = {};
        obj[detail.path[0]] = detail.message;
        return obj
      }) }, { status: 422 });
    }

    const userExist = await User.findOne({ email });

    if(userExist){
      return NextResponse.json({ error: "user already exist" }, { status: 422 });
    }

    const SALT_WORK_FACTOR = 10;

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    
    const hash = await bcrypt.hash(password, salt)

    const user = await new User({ name, email, password:hash }).save();

    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error}, { status: 500 });
  }
}


