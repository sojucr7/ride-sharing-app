import Ride from "../../models/Ride"
import connect from "../../db/connect"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
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

    const ride = await new Ride({
      source: { type: "Point", coordinates: sourceCoordinates },
      destination: { type: "Point", coordinates: destinationCoordinates },
      paths: { type: "LineString", coordinates: pathCoordinates },
    }).save();

    return NextResponse.json({});
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
  } catch (error: any) {}
}
