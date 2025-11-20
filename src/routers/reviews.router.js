import express from "express";
import { reviewsController } from "../controllers/reviews.controller.js";

const reviewsRouter = express.Router();

// Tạo route CRUD:
reviewsRouter.post("/create-reviews", reviewsController.create);
reviewsRouter.get("/", reviewsController.findAll);

export default reviewsRouter;
