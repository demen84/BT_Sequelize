import express from "express";
import likeRouter from "./like-unlike.router.js"; //Cả Like & unLike


// Step 1:
const rootRouter = express.Router();

// Step 2:
rootRouter.use('/like', likeRouter);

// rootRouter.use('/user', likeRouter);


export default rootRouter;