const SALT_WORK_FACTOR = 10;
import bcrypt from "bcrypt";
import { validateEmail } from "../lib/utils";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: [true, "name is required"], max: 25 },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Invalid email address"],
    required: [true, "email is required"],
  },
  password: { type: String, required: [true, "password is required"]},
});

const User = models.User || model("User", userSchema);

export default User;
