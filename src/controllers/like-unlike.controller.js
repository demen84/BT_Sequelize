import { responseSuccess } from "../common/helpers/function.helper.js";
import { likeService } from "../services/like-unlike.service.js";

export const likeController = {
   createLike: async (req, res, next) => {
      const result = await likeService.createLike(req);
      const response = responseSuccess(result, `Create like successfully`);
      res.status(response.statusCode).json(response);
   },

   findAllLike: async function (req, res, next) {
      const result = await likeService.findAllLike(req);
      const response = responseSuccess(result, `Get all likes successfully`);
      res.status(response.statusCode).json(response);
   },

   findOne: async function (req, res, next) {
      const result = await likeService.findOne(req);
      const response = responseSuccess(
         result,
         `Get like #${req.params.id} successfully`
      );
      res.status(response.statusCode).json(response);
   },

   removeLike: async (req, res, next) => {
      const result = await likeService.removeLike(req);
      const response = responseSuccess(
         result,
         `Remove like #${req.params.id} successfully`
      );
      res.status(response.statusCode).json(response);
   },
};
