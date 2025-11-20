import { responseSuccess } from "../common/helpers/function.helper.js";
import { reviewsService } from "../services/reviews.service.js";

export const reviewsController = {
   create: async function (req, res, next) {
      const result = await reviewsService.create(req);
      const response = responseSuccess(result, `Create reviews successfully`);
      res.status(response.statusCode).json(response);
   },

   findAll: async function (req, res, next) {
      const result = await reviewsService.findAll(req);
      const response = responseSuccess(result, `Get all reviewss successfully`);
      res.status(response.statusCode).json(response);
   },

   findOne: async function (req, res, next) {
      const result = await reviewsService.findOne(req);
      const response = responseSuccess(
         result,
         `Get reviews #${req.params.id} successfully`
      );
      res.status(response.statusCode).json(response);
   },

   update: async function (req, res, next) {
      const result = await reviewsService.update(req);
      const response = responseSuccess(
         result,
         `Update reviews #${req.params.id} successfully`
      );
      res.status(response.statusCode).json(response);
   },

   remove: async function (req, res, next) {
      const result = await reviewsService.remove(req);
      const response = responseSuccess(
         result,
         `Remove reviews #${req.params.id} successfully`
      );
      res.status(response.statusCode).json(response);
   },
};
