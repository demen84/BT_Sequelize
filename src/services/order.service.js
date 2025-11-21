import { buildQuery } from "../common/helpers/build-query.helper.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import prisma from "../common/prisma/connect.prisma.js";

export const orderService = {
   // !Xử lý order
   create: async (req) => {
      const { user_id, food_id, amount, code, arr_sub_id } = req.body;

      // 1. Validation input
      if (!Number(user_id) || !Number(food_id) || !Number(amount)) {
         throw new BadRequestException("Chưa nhập thông tin order");
      }

      // 2. Check user_id có tồn tại trong db?
      const user = await prisma.users.findUnique({
         where: { user_id: Number(user_id) },
      });
      if (!user) {
         throw new BadRequestException(
            `UserId ${user_id} không tồn tại trong db`
         );
      }

      // 3. Check food_id có tồn tại trong db?
      const food = await prisma.foods.findUnique({
         where: { food_id: Number(food_id) },
      });
      if (!food) {
         throw new BadRequestException(
            `FoodId ${food_id} không tồn tại trong db`
         );
      }

      // Xử lý lưu order
      const newOrder = await prisma.orders.create({
         data: {
            user_id,
            food_id,
            amount,
            code,
            arr_sub_id,
         },
      });

      return newOrder;
   },

   // !Lấy danh sách đơn hàng (có phân trang)
   findAll: async (req) => {
      const { page, pageSize, filters, skip } = buildQuery(req.query);

      const ordersPromise = prisma.orders.findMany({
         where: filters,
         skip: skip, // Bỏ qua bao nhiêu phần tử
         take: pageSize, // Số phần tử cần lấy
      });

      const totalItemPromise = prisma.orders.count({ where: filters });

      const [orders, totalItem] = await Promise.all([
         ordersPromise,
         totalItemPromise,
      ]);

      const totalPage = Math.ceil(totalItem / pageSize);

      // const orders1 = await prisma.orders.findMany({
      //    select: {
      //       order_id: true,
      //       user_id: true,
      //       food_id: true,
      //       amount: true,
      //       code: true,
      //       arr_sub_id: true,
      //       created_at: true,
      //       users: {
      //          select: { full_name: true, email: true },
      //       },
      //       foods: {
      //          select: { food_name: true, price: true },
      //       },
      //    },
      // });

      return {
         page: page,
         pageSize: pageSize,
         totalItem: totalItem,
         totalPage: totalPage,
         items: orders || [],
      };
   },

   // !Lấy đơn hàng theo user_id
   findByUserId: async (req) => {
      const { id } = req.params;

      // 1. Validation input
      const userId = Number(id);
      if (!userId) {
         throw new BadRequestException("Chưa có user_id");
      }

      // 2. Kiểm tra user_id có tồn tại trong db ?
      const user = await prisma.users.findUnique({
         where: { user_id: userId },
      });

      if (!user) {
         throw new BadRequestException(`UserId ${id} không tồn tại`);
      }

      const orders = await prisma.orders.findMany({
         where: { user_id: userId },
         include: {
            foods: true,
            users: true,
         },
      });

      return orders;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} order`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} order`;
   },
};
