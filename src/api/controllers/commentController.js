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
        const alreadyExist=await Comment.findOne({name:comment.name})
        if(alreadyExist){
            throw new Error(`${comment.name} has already commented this post`)
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
         
           if (comment) {
             comment.name = name
             comment.message = message
            
         
             const updatedComment = await comment.save()
             res.json(updatedComment)
           } else {
             res.status(404)
             throw new Error('Comment not found')
           }
        }   
)
  
exports.deleteComment =asyncHandler(
    async (req, res) => {

         const comment = await Comment.findById(req.params.id)
         if (comment) {
           await Comment.findByIdAndDelete(req.params.id)
           res.json({ message: 'Comment removed' })
         } else {
           res.status(404)
           throw new Error('Comment not found')
         }
        }
) 