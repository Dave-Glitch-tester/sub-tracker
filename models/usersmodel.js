import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JWT_LIFETIME, JWT_SECRET } from "../config/env.js";
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide the name"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide the password"],
      minlength: 6,
      maxlength: 50,
      // select: false, Exclude password from query results by default
    },
    email: {
      type: String,
      required: [true, "Please Provide the email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (err) {
    next(err);
  }
});
UserSchema.methods.createJwt = function () {
  return JWT.sign(
    { userId: this._id, email: this.email, name: this.name },
    JWT_SECRET,
    {
      expiresIn: JWT_LIFETIME,
    }
  );
};
UserSchema.methods.comparePassword = async function (password) {
  const ismatch = await bcrypt.compare(password, this.password);
  return ismatch;
};
export default model("Users", UserSchema);
