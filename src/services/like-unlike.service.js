export const likeService = {
    create: async function (req) {
        return `This action create`;
    },

    findAllLike: async function (req) {
        return `At Service: Get All Like`;
    },

    findAllUnLike: async function (req) {
        return `At Service: Get all unLike`;
    },

    findOne: async function (req) {
        return `This action returns a id: ${req.params.id} like`;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} like`;
    },

    delete: async function (req) {
        return `This action delete a id: ${req.params.id} like`;
    },
};