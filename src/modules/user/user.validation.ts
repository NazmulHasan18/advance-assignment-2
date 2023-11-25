import Joi from "joi";

const fullNameSchema = Joi.object({
   firstName: Joi.string().required(),
   lastName: Joi.string().required(),
});

const addressSchema = Joi.object({
   street: Joi.string().required(),
   city: Joi.string().required(),
   country: Joi.string().required(),
});

const ordersSchema = Joi.object({
   productName: Joi.string(),
   price: Joi.number(),
   quantity: Joi.number(),
});

const userSchema = Joi.object({
   userId: Joi.number().required(),
   username: Joi.string().alphanum().min(3).max(30).required().required(),
   password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
   fullName: fullNameSchema.required(),
   age: Joi.number().required(),
   email: Joi.string().email().required(),
   isActive: Joi.boolean().required(),
   hobbies: Joi.array().items(Joi.string()).required(),
   address: addressSchema.required(),
   orders: Joi.array().items(ordersSchema),
   isDeleted: Joi.boolean().default(false),
});

export default userSchema;
