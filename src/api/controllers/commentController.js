const asyncHandler = require('express-async-handler')
const Comment = require("../models/commentModel");

exports.listAllComments =asyncHandler(
    async(req, res) => {
        const comments = await Comment.find({post_id:req.params.postId});
            res.status(200);
            res.json(comments);
    
        }) 

exports.createComment =asyncHandler(
    async (req, res) => {
        const comment=req.body
        comment.post_id=req.params.postId
        comment.user=req.user._id
        const alreadyExist=await Comment.findOne({user:req.user._id})
        if(alreadyExist &&req.user.isAdmin===false){
            throw new Error(`${req.user.name} has already commented this post`)
        }
        const newComment = new Comment(comment);
        const createdComment = await newComment.save();
        res.status(201);
        res.json(createdComment);
        
    }
)

exports.getComment =asyncHandler(
    async (req, res) => {   
        const comment = await Comment.findById(req.params.id)
    
        if (comment) {
            res.status(200).json(comment)
        } else {
            res.status(404)
            throw new Error('Comment not found')
        }  
    }
) 


exports.updateComment =asyncHandler(
    async (req, res) => {
         const {
             name,
             message,
           } = req.body
         
           const comment = await Comment.findById(req.params.id)
         
           if (!comment) {
            res.status(404)
            throw new Error('Comment not found')
             
           }

           if(req.user._id.toString()!==comment.user.toString()&&req.user.isAdmin!==true){
            res.status(400)
            throw new Error('Not Authorize to edit this comment')
           }

           comment.name = name
           comment.message = message
           const updatedComment = await comment.save()
           res.status(200).json(updatedComment)
        }   
)
  
exports.deleteComment =asyncHandler(
    async (req, res) => {

         const comment = await Comment.findById(req.params.id)
         if (!comment) {
            res.status(404)
            throw new Error('Comment not found')
           
          }

        
           if(req.user._id.toString()!==comment.user.toString()&&req.user.isAdmin!==true){
            res.status(400)
            throw new Error('Not Authorize to delete this comment')
           }

           await Comment.findByIdAndDelete(req.params.id)
           res.json({ message: 'Comment removed' })
         
        }
) 