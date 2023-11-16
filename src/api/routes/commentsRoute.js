module.exports = (server) => {
    
    const commentController=require("../controllers/commentController")
    
    const authMiddleware=require("../middleware/authMiddleware")
 
    server.route("/posts/:postId/comments")
    .all(authMiddleware.protect)
    .get(commentController.listAllComments)
    .post(commentController.createComment)

    server.route("/comments/:id")
    .all(authMiddleware.protect)
    .get(commentController.getComment)
    .put(commentController.updateComment)
    .delete(commentController.deleteComment)
}