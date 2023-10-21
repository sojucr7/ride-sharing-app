import { Schema} from "mongoose";
import { cookies } from 'next/headers'
import Ride from "../../models/Ride";
import connect from "../../db/connect";
import { NextResponse } from "next/server";
import { createSchema } from "../../models/RideSchema";
import {parseJwt} from '../../lib/utils'

export async function POST(request: Request) {
  try {

    const cookieStore = cookies()
    const token = cookieStore.get('token')
    const {user_id,email,name}=parseJwt(token!.value)
    await connect();
    const {
      sourceCoordinates,
      pathCoordinates,
      destinationCoordinates,
    }: {
      sourceCoordinates: [number, number];
      destinationCoordinates: [number, number];
      pathCoordinates: [number, number][];
    } = await request.json();

    let validation = createSchema.validate({
      sourceCoordinates,
      destinationCoordinates,
      pathCoordinates,
    },{abortEarly:false});

    if (validation.error) {
      return NextResponse.json(
        {errors: validation.error.details.map((detail)=>{
          const obj:{[k: string]: string} = {};
          obj[detail.path[0]] = detail.message;
          return obj
        }) },
        { status: 422 }
      );
    }
    console.log()
   

    const ride = await new Ride({
      source: { type: "Point", coordinates: sourceCoordinates },
      destination: { type: "Point", coordinates: destinationCoordinates },
      paths: { type: "LineString", coordinates: pathCoordinates },
      user:{_id:user_id,name,email}
    }).save();

    return NextResponse.json({ success: true  }, { status: 201 });
   
  } catch (error: any) {
    return NextResponse.json({ success: false,message:"something went wrong" }, { status: 500 });
  }
}


//STEPS

// source -> [lat,lng] -> point
// route ->[[lat,lng],[lat,lng],[lat,lng],[lat,lng]] ->poliline
// dest -> [lat,lng] -> point

// source -> { coordinate:[lat,lng],name:"xxx" }
// dest -> { coordinate:[lat,lng],name:"yyy" }
// route ->[coordinates:[lat,lng],[lat,lng],[lat,lng],[lat,lng]] ->poliline

//https://stackoverflow.com/questions/28872285/mongodb-insert-polyline-and-query-nearby

// {
//     near: { type: 'Point', coordinates: [ -105.81992341157914, 33.87006359161691
//    ] },
//     distanceField: 'distance',
//     maxDistance: 50,

//     spherical: true
//   }  