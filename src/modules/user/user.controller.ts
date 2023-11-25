import { Request, Response } from "express";
import { TUser } from "./user.interface";
import Joi from "joi";
import {
   addOrderOfUserInDB,
   addUserToDB,
   calculateTotalPriceOfUserOrder,
   deleteUserInDB,
   getAllOrderOfUserFromDB,
   getAllUsersFromDB,
   getSingleUserFromDB,
   updateUserInDB,
} from "./user.services";
import userSchema from "./user.validation";

const createAUser = async (req: Request, res: Response) => {
   try {
      const user: TUser = req.body;

      const { error } = userSchema.validate(user);
      if (error) {
         res.status(500).send({
            success: false,
            message: "User created failed Joi",
            error: error,
         });
      } else {
         const result = await addUserToDB(user);

         res.status(200).send({
            success: true,
            message: "User created Successfully",
            data: result,
         });
      }
   } catch (error) {
      res.status(500).send({
         success: false,
         message: "User created failed",
         error: error,
      });
   }
};

const getAllUsers = async (req: Request, res: Response) => {
   try {
      const getUsers = await getAllUsersFromDB();
      res.status(200).send({
         success: true,
         message: "User retrieve Successfully",
         data: getUsers,
      });
   } catch (error) {
      res.status(500).send({
         success: false,
         message: "User get failed",
         error: error,
      });
   }
};

const getSingleUser = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;
      const user = await getSingleUserFromDB(Number(id));
      res.status(200).send({
         success: true,
         message: "User fetched Successfully",
         data: user,
      });
   } catch (error: any) {
      res.json({
         success: false,
         message: error.message || "User not Exist",
         error: error,
      });
   }
};
const updateSingleUser = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;
      const data = req.body;
      const user = await updateUserInDB(Number(id), data);
      res.status(200).send({
         success: true,
         message: "User Update Successfully",
         data: user,
      });
   } catch (error: any) {
      res.json({
         success: false,
         message: error.message || "User not Exist",
         error: error,
      });
   }
};
const deleteUser = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;
      const user = await deleteUserInDB(Number(id));
      res.status(200).send({
         success: true,
         message: "User Deleted Successfully",
         data: user,
      });
   } catch (error: any) {
      res.json({
         success: false,
         message: error.message || "User not Exist",
         error: error,
      });
   }
};

const addOrderOfUser = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;
      const order = req.body;
      const result = await addOrderOfUserInDB(Number(id), order);
      res.status(200).send({
         success: true,
         message: "Order created successfully!",
         data: result,
      });
   } catch (error: any) {
      res.json({
         success: false,
         message: error.message || "User not Exist",
         error: error,
      });
   }
};
const getAllOrderOfUser = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;

      const orders = await getAllOrderOfUserFromDB(Number(id));
      res.status(200).send({
         success: true,
         message: "Order fetched successfully!",
         data: { orders },
      });
   } catch (error: any) {
      res.json({
         success: false,
         message: error.message || "User not Exist",
         error: error,
      });
   }
};
const getTotalOrderPriceByUserId = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;

      const totalPrice = await calculateTotalPriceOfUserOrder(Number(id));
      res.status(200).send({
         success: true,
         message: "Order fetched successfully!",
         data: { totalPrice },
      });
   } catch (error: any) {
      res.json({
         success: false,
         message: error.message || "User not Exist",
         error: error,
      });
   }
};

export default {
   createAUser,
   getAllUsers,
   getSingleUser,
   updateSingleUser,
   deleteUser,
   addOrderOfUser,
   getAllOrderOfUser,
   getTotalOrderPriceByUserId,
};
