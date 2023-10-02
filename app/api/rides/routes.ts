import connect from "../../db/connect";

export async function POST(request: Request) {
  try {
    await connect();

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

  } catch (error: any) {
  }
}


