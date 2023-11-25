import { CustomError } from "../middleware/CustomError/CustomError";
import { TOrders, TUser } from "./user.interface";
import User from "./user.model";

export const addUserToDB = async (userData: TUser) => {
   const result = await User.create(userData);
   const findUser = await User.findOne({ _id: result._id }, { password: 0, orders: 0 });
   return findUser;
};

export const getAllUsersFromDB = async () => {
   const result = await User.find(
      {},
      {
         _id: 0,
         username: 1,
         fullName: 1,
         age: 1,
         email: 1,
         address: 1,
      }
   );
   return result;
};

export const getSingleUserFromDB = async (id: number) => {
   const existingUser = await User.isUserExist(id);
   if (existingUser) {
      return existingUser;
   } else {
      throw new CustomError(404, "User not found");
   }
};
export const updateUserInDB = async (id: number, userData: TUser) => {
   const existingUser = await User.isUserExist(id);
   if (existingUser) {
      await User.findOneAndUpdate({ userId: id }, userData);
      const updatedUser = await User.findOne({ userId: id }, { password: 0, orders: 0 });

      return updatedUser;
   } else {
      throw new CustomError(404, "User not found");
   }
};
export const deleteUserInDB = async (id: number) => {
   const existingUser = await User.isUserExist(id);
   if (existingUser) {
      await User.findOneAndUpdate({ userId: id }, { isDeleted: true });
      return null;
   } else {
      throw new CustomError(404, "User not found");
   }
};

export const addOrderOfUserInDB = async (id: number, order: TOrders) => {
   const existingUser = await User.isUserExist(id);
   if (existingUser) {
      const user = await User.findOne({ userId: id });

      if (user) {
         // Checking if an order with the same product already exists
         const existingOrderIndex = user.orders.findIndex(
            (existingOrder) => existingOrder.productName === order.productName
         );

         if (existingOrderIndex !== -1) {
            // Updating the existing order instead of adding a new one
            user.orders[existingOrderIndex].quantity += order.quantity;
            await user.save();
         } else {
            // Adding the new order to the array
            user.orders.push(order);
            await user.save();
         }
      }
      return null;
   } else {
      throw new CustomError(404, "User not found");
   }
};

export const getAllOrderOfUserFromDB = async (id: number) => {
   const existingUser = await User.isUserExist(id);
   if (existingUser) {
      const user = await User.findOne({ userId: id });
      return user?.orders;
   } else {
      throw new CustomError(404, "User not found");
   }
};
export const calculateTotalPriceOfUserOrder = async (id: number) => {
   const existingUser = await User.isUserExist(id);
   if (existingUser) {
      const user = await User.findOne({ userId: id });
      const total = user?.orders.reduce((total, order) => total + order.price * order.quantity, 0);
      return total;
   } else {
      throw new CustomError(404, "User not found");
   }
};
