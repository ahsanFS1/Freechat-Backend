const express = require("express");
const { uploadPostService,updatePostService,getPostsService,fetchRecentPosts} = require("../Services/posts.service");

async function uploadPost(req, res) {
  const { imageUrl } = req.body;
  const {caption}=req.body;
  const { userId } = req.params;
  try {
    const post = await uploadPostService({ userId, imageUrl,caption });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(401).json("Image could not be uploaded");
  }
}

async function updatePost(req,res){
    const {postId} = req.params
    const{caption} = req.body
    const{imageUrl} = req.body

    try{
        const post = await updatePostService({postId,caption,imageUrl})
        return res.status(201).json(post);

    }catch(err){
        return res.status(401).json("Image could not be updated")
    }
}


async function getPosts(req,res){

    const {userId} = req.params

    try{
        const posts = await getPostsService({userId})
        return res.status(200).json(posts)

    }catch(err){
        return res.status(404).json(err.message)
    }



}


async function getRecentPostsHandler(req, res) {
  try {
    const posts = await fetchRecentPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
module.exports = {
  uploadPost,
  updatePost,
  getPosts,
  getRecentPostsHandler
};
