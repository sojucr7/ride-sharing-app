import User from "./User";
import { Schema, model, models } from "mongoose";
import { validateEmail } from "../lib/utils";

const rideSchema = new Schema({
  source: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  paths: {
    type: {
      type: String,
      enum: ['LineString'],
      required: true
    },
    coordinates: {
      type: [[Number]],
      required: true
    }
},
  destination: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  user: {
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: { type: String, required: [true, "name is required"], max: 25 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validateEmail, "Invalid email address"],
      required: [true, "email is required"],
    }
  }
});

const Ride = models.Ride || model("Ride", rideSchema);

export default Ride;
