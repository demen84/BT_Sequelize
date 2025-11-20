import express from "express";
import { likeController } from "../controllers/like-unlike.controller.js";

const likeRouter = express.Router();

// Tạo route CRUD
likeRouter.post("/create-like", likeController.createLike);
likeRouter.delete("/remove-like", likeController.removeLike);
likeRouter.get("/", likeController.findAllLike);

export default likeRouter;
