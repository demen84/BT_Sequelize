import express from "express";
import { orderController } from "../controllers/order.controller.js";

const orderRouter = express.Router();

// Tạo route CRUD
orderRouter.post("/create-order", orderController.create);
orderRouter.get("/", orderController.findAll);
orderRouter.get("/:id", orderController.findByUserId);
orderRouter.patch("/:id", orderController.update);
orderRouter.delete("/:id", orderController.remove);

export default orderRouter;
