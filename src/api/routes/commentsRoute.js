module.exports = (server) => {
    
    const commentController=require("../controllers/commentController")
 
    server.route("/posts/:postId/comments")
    .get(commentController.listAllComments)
    .post(commentController.createComment)

    server.route("/comments/:id")
    .get(commentController.getComment)
    .put(commentController.updateComment)
    .delete(commentController.deleteComment)
}