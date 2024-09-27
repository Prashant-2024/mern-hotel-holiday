import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

// type of User object is defined to be error prone in case any of them is missing
// typescript will throw an error if any of the required field is missing from the object
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema<UserType>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// middleware for mongodb to hash the password, if it has been changed(updated) before saving it to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next(); // this will call the next middleware/function in line
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
