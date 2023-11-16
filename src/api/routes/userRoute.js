module.exports = (server) => {
    const userController = require("../controllers/userController");
    const authMiddleware=require("../middleware/authMiddleware")

    server.route('/users').post(userController.registerUser).get(authMiddleware.protect, userController.getUsers)

    server.route('/users/login').post(userController.login)

    server.route('/users/profile')
    .all(authMiddleware.protect)
    .get( userController.getUserProfile)
    .put(userController.updateUserProfile)
   
   
    server.route('/users/:id')
    .delete(authMiddleware.protect,authMiddleware.admin, userController.deleteUser)
    .get(authMiddleware.protect,authMiddleware.admin, userController.getUserById)
    .put(authMiddleware.protect,authMiddleware.admin, userController.updateUser)
}