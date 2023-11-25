import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrders, TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../app/config";

const fullNameSchema = new Schema<TFullName>({
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
});
const addressSchema = new Schema<TAddress>({
   street: {
      type: String,
      required: true,
   },
   city: {
      type: String,
      required: true,
   },
   country: {
      type: String,
      required: true,
   },
});
const ordersSchema = new Schema<TOrders>({
   productName: {
      type: String,
   },
   price: {
      type: Number,
   },
   quantity: {
      type: Number,
   },
});

const userSchema = new Schema<TUser, UserModel>({
   userId: {
      type: Number,
      required: true,
      unique: true,
   },
   username: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   fullName: fullNameSchema,
   age: {
      type: Number,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   isActive: { type: Boolean, required: true },
   hobbies: {
      type: [String],
      required: true,
   },
   address: addressSchema,
   orders: [ordersSchema],
   isDeleted: {
      type: Boolean,
      default: false,
   },
});

// schema pre middleware

userSchema.pre("save", async function (next) {
   this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
   next();
});
// schema post middleware
userSchema.post("save", async function (doc, next) {
   next();
});

// find middleware
userSchema.pre("find", function (next) {
   this.find({ isDeleted: { $ne: true } });
   next();
});

userSchema.pre("findOne", function (next) {
   this.findOne({ isDeleted: { $ne: true } });
   next();
});

//  schema static user exist error

userSchema.statics.isUserExist = async function (id) {
   const existingUser = await User.findOne({ userId: id }, { orders: 0, password: 0 });
   return existingUser;
};

const User = model<TUser, UserModel>("User", userSchema);

export default User;
