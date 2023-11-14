module.exports = (server) => {
    const postController = require("../controllers/postController");
    
    server.route("/posts")
    .get(postController.listAllPosts)
    .post(postController.createAPost);
    server.route("/posts/:id")
    .get(postController.getPost)
    .put(postController.updatePost)
    .delete(postController.deletePost)
}