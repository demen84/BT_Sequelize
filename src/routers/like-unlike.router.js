import express from 'express';
import { likeController } from '../controllers/like-unlike.controller.js';

const likeRouter = express.Router();

// Tạo route CRUD
likeRouter.post('/', likeController.create);
likeRouter.get('/', likeController.findAllLike);
likeRouter.get('/unlike', likeController.findAllUnLike);


export default likeRouter;