const asyncHandler = require('express-async-handler')
const Post = require("../models/postModel");
const textApiProvider=require('../providers/textApiProvider')

exports.listAllPosts =asyncHandler(
    async(req, res) => {
        const posts = await Post.find({})
        .populate(
            {path:'creator',
            model:'User',
            select:"name email"}
            );
            
        res.status(200).json(posts);
    
        }) 

exports.createAPost =asyncHandler(
    async (req, res) => {
        const {title,content}=req.body
        const newPost = new Post({
            title:title,
            content:content,
            creator:req.user._id
        });
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
        .populate(
            {path:'creator',
            model:'User',
            select:"name email"}
            );
    
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
           if(!post){
            res.status(404)
            throw new Error('Post not found')
           }

           const ownedPost=await Post.findOne({_id:req.params.id,creator:req.user._id})

           if(!ownedPost){
            res.status(404)
            throw new Error('Not Autorized to edit this post')
           }
         
           post.title = title
           post.content = content
           const updatedPost = await post.save()
           res.status(200).json(updatedPost)
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