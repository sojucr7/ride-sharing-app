import bcrypt from "bcrypt";
import { isEmail } from 'validator';
import { Schema, model, models } from 'mongoose';
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [ isEmail, 'invalid email'],
        required: [true, "email required"],
        select: false
    },
    password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
    var user = this;
    //https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


const User = models.User || model('User', userSchema);

export default User;
