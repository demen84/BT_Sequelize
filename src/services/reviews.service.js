import { where } from "sequelize";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import prisma from "../common/prisma/connect.prisma.js";

export const reviewsService = {
   // Xử lý đánh giá (reviews) nhà hàng
   create: async (req) => {
      const { user_id, res_id, amount } = req.body;

      // 1. Validate input data
      if (!Number(user_id) || !Number(res_id) || !Number(amount)) {
         throw new BadRequestException(
            "Chưa nhập thông tin UserId, ResId & Amount"
         );
      }

      // 2. Check user_id có tồn tại trong db?
      const user = await prisma.users.findUnique({
         where: { user_id },
      });
      if (!user) {
         throw new BadRequestException(
            `UserId ${user_id} không tồn tại trong db`
         );
      }

      // 3. Check res_id có tồn tại trong db?
      const rest = await prisma.restaurant.findUnique({
         where: { res_id },
      });
      if (!rest) {
         throw new BadRequestException(
            `Nhà hàng có Id ${res_id} không tồn tại trong db`
         );
      }

      // 4. Kiểm tra đã đánh giá nhà hàng hay chưa?
      const existReviews = await prisma.rate_res.findUnique({
         where: { user_id_res_id: { user_id, res_id } }, // !Gom khóa
      });
      if (existReviews) {
         throw new BadRequestException("Bạn đã đánh giá nhà hàng này rồi.");
      }

      // Xử lý lưu đánh giá
      const reivews = await prisma.rate_res.create({
         data: { user_id, res_id, amount },
      });
      return {
         message: "Đánh giá nhà hàng thành công",
         data: reivews,
      };
   },

   // Lấy danh sách đánh giá nhà hàng theo user:
   findAll: async (req) => {
      const reviews = await prisma.rate_res.findMany({
         select: {
            user_id: true,
            res_id: true,
            amount: true,
            date_rate: true,
         },
      });
      if (!reviews) {
         throw new BadRequestException("Chưa có đánh giá nào");
      }
      // Format lại date_rate
      const formattedReviews = reviews.map((r) => ({
         ...r,
         date_rate: r.date_rate.toLocaleDateString("vi-VN"), // -> dd/mm/yyyy
      }));

      return formattedReviews;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} reviews`;
   },
};
