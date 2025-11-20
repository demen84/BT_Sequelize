import express from "express";
import likeRouter from "./like-unlike.router.js"; //Cả Like & unLike
import reviewsRouter from "./reviews.router.js";
import orderRouter from "./order.router.js";

// Step 1:
const rootRouter = express.Router();

// Step 2:
rootRouter.use("/like", likeRouter);
rootRouter.use("/reviews", reviewsRouter);
rootRouter.use("/order", orderRouter);

export default rootRouter;
