import { BadRequestException } from "../common/helpers/exception.helper.js";
import prisma from "../common/prisma/connect.prisma.js";

export const likeService = {
   // Xử lý like nhà hàng
   createLike: async (req) => {
      const { user_id, res_id } = req.body;

      // 1. Kiểm tra user_id & res_id có đc nhập hay chưa? (Validate input)
      if (!Number(user_id) || !Number(res_id)) {
         throw new BadRequestException(`Bạn chưa nhập ${user_id} & ${res_id}`);
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

      // 4. Kiểm tra user đã like nhà hàng đó hay chưa?
      const existLike = await prisma.like_res.findUnique({
         where: { user_id_res_id: { user_id, res_id } }, // !composite key (gom khóa)
      });
      //   console.log("EXIST", exist);
      if (existLike)
         throw new BadRequestException(
            `UserId ${user_id} đã like nhà hàng này rồi`
         );

      // Xử lý lưu like nhà hàng
      const like = await prisma.like_res.create({
         data: {
            user_id,
            res_id,
         },
      });

      return true;
   },

   // Lấy danh sách like nhà hàng theo user
   findAllLike: async function (req) {
      const allLike = await prisma.like_res.findMany({
         select: {
            user_id: true,
            res_id: true,
            date_like: true,
         },
      });
      return allLike;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} like`;
   },

   // Xử lý unlike nhà hàng
   removeLike: async (req) => {
      const { user_id, res_id } = req.body;

      // 1. Kiểm tra user_id & res_id có đc nhập hay chưa? (Validate input)
      if (!Number(user_id) || !Number(res_id)) {
         throw new BadRequestException(`UserId & Res_Id không hợp lệ`);
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

      // 4. Kiểm tra user đã like nhà hàng đó hay chưa?
      const exist = await prisma.like_res.findUnique({
         where: { user_id_res_id: { user_id, res_id } }, // !composite key (gom khóa)
      });
      //   console.log("EXIST", exist);
      if (!exist)
         throw new BadRequestException(
            `UserId ${user_id} chưa like nhà hàng này.`
         );

      // Xử lý unlike nhà hàng
      const like = await prisma.like_res.delete({
         where: { user_id_res_id: { user_id, res_id } }, // Gom khóa
      });

      return true;
   },
};
