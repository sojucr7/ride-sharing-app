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
  password: { type: String, required: [true, "password is required"],select:false },
});

userSchema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password!, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: (err: Error | undefined, isMatch?: boolean) => void
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(undefined, isMatch);
  });
};

const User = models.User || model("User", userSchema);

export default User;
