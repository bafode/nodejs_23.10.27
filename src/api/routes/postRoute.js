module.exports = (server) => {
    const postController = require("../controllers/postController");
    const authMiddleware=require("../middleware/authMiddleware")
    
    server.route("/posts")
    .all(authMiddleware.protect)
    .get(postController.listAllPosts)
    .post(authMiddleware.admin,postController.createAPost);

    server.route("/posts/:id")
    .all(authMiddleware.protect)
    .get(postController.getPost)
    .put(authMiddleware.admin,postController.updatePost)
    .delete(authMiddleware.admin,postController.deletePost)
}