module.exports = (server) => {
    const userController = require("../controllers/userController");
    const protect=require("../middleware/authMiddleware")

    server.route('/users').post(userController.registerUser).get(protect, userController.getUsers)

    server.route('/users/login').post(userController.authUser)

    server.route('/users/profile')
    .get(protect, userController.getUserProfile)
    .put(protect, userController.updateUserProfile)
   
   
    server.route('/users/:id')
    .delete(protect, userController.deleteUser)
    .get(protect, userController.getUserById)
    .put(protect, userController.updateUser)
}