import User from "../../../models/User";
import connect from "../../../db/connect";
import {updateSchema} from "../../../models/UserSchema";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  await connect();

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
    
  } catch (e) {    
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await connect();

    const formData = await request.formData();

    const name = formData.get("name");

    const password = formData.get("password");

    const fields:{[key: string]: FormDataEntryValue | null} = { name, password };

    let nonEmptyFields:{[key: string]: FormDataEntryValue | null}={}

    Object.keys(fields).forEach((key:string)=>{
      if(fields[key]){
        nonEmptyFields[key]=fields[key]
      }
    })
    console.log(nonEmptyFields)
    let validation = updateSchema.validate(nonEmptyFields);

    if (validation.error) {
      return NextResponse.json({error:validation.error.details}, { status: 422 });
    }

    await User.findByIdAndUpdate(id, nonEmptyFields);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (e) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
