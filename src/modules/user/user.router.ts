import express from "express";
import userController from "./user.controller";

const router = express.Router();

// all user routes
router.post("/users", userController.createAUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:userId", userController.getSingleUser);
router.put("/users/:userId", userController.updateSingleUser);
router.delete("/users/:userId", userController.deleteUser);
// all orders routes
router.put("/users/:userId/orders", userController.addOrderOfUser);
router.get("/users/:userId/orders", userController.getAllOrderOfUser);
router.get("/users/:userId/orders/total-price", userController.getTotalOrderPriceByUserId);

export const userRouter = router;
