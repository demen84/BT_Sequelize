import { responseSuccess } from "../common/helpers/function.helper.js";
import { likeService } from "../services/like-unlike.service.js";

export const likeController = {
    create: async (req, res, next) => {
        const result = await likeService.create(req);
        const response = responseSuccess(result, `Create like successfully`);
        res.status(response.statusCode).json(response);
    },

    findAllLike: async function (req, res, next) {
        const result = await likeService.findAllLike(req);
        const response = responseSuccess(result, `Get all likes successfully`);
        res.status(response.statusCode).json(response);
    },

    findAllUnLike: async function (req, res, next) {
        const result = await likeService.findAllUnLike(req);
        const response = responseSuccess(result, `Get all unlikes successfully`);
        res.status(response.statusCode).json(response);
    },

    findOne: async function (req, res, next) {
        const result = await likeService.findOne(req);
        const response = responseSuccess(result, `Get like #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    },

    update: async function (req, res, next) {
        const result = await likeService.update(req);
        const response = responseSuccess(result, `Update like #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    },

    delete: async function (req, res, next) {
        const result = await likeService.delete(req);
        const response = responseSuccess(result, `Delete like #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    }
};