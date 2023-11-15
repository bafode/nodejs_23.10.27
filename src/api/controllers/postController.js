const asyncHandler = require('express-async-handler')
const Post = require("../models/postModel");
const textApiProvider=require('../providers/textApiProvider')

exports.listAllPosts =asyncHandler(
    async(req, res) => {
        const posts = await Post.find({});
            res.status(200);
            res.json(posts);
    
        }) 

exports.createAPost =asyncHandler(
    async (req, res) => {
        const newPost = new Post(req.body);
        let randomTextPromise=textApiProvider.getRandomText()
        let response=await randomTextPromise;
        if(!newPost.content){
            newPost.content=response
        }
        const post = await newPost.save();
        res.status(201);
        res.json(post);
        
    }
)

exports.getPost =asyncHandler(
    async (req, res) => {   
        const post = await Post.findById(req.params.id)
    
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404)
            throw new Error('Post not found')
        }  
    }
) 


exports.updatePost =asyncHandler(
    async (req, res) => {
         const {
             title,
             content,
           } = req.body
         
           const post = await Post.findById(req.params.id)
         
           if (post) {
             post.title = title
             post.content = content
            
         
             const updatedPost = await post.save()
             res.json(updatedPost)
           } else {
             res.status(404)
             throw new Error('Post not found')
           }
        }   
)
  
exports.deletePost =asyncHandler(
    async (req, res) => {

         const post = await Post.findById(req.params.id)
         if (post) {
           await Post.findByIdAndDelete(req.params.id)
           res.json({ message: 'Post removed' })
         } else {
           res.status(404)
           throw new Error('Post not found')
         }
        }
) 