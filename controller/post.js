const Post = require('../model/Post');
const Comment = require('../model/Comments');
const Joi = require('joi');
const moment = require('moment');

const createPost = async (req, res) => {
  const validationSchema = Joi.object({
    title: Joi.string().required(),
  })
  const { value, error } = validationSchema.validate(req.body)
  if(error) { 
    const posts = await Post.find();
    return res.status(404).render('index', {error: error.details[0].message, posts })
  }else{
    const newPost = new Post({...value, user: req.session.userId})
    try{
      await newPost.save();
      res.status(200).redirect('/post');
    }catch(error){
      res.status(404).json({message: error.message});
    } 
  } 
}

const getPosts = async (req, res) => {
  try{
    const posts = await Post.find()
      .populate('user')
      .populate({path: 'comments', populate: {path: 'user', select: 'nickname city' }});                                   
    const userId = req.session.userId;
    res.status(200).render('index', {posts: posts, data: moment, userId: userId });
  }catch(error){
    res.status(404).json({message: error.message})
  }  
}

const getPost = async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).render('posts/edit', {post: post, data: moment });
  }catch(error){
    res.status(404).json({message: error.message})
  }  
}

const getPostByDate = async (req, res) => {
  try{
    const dataFilter = moment().subtract(1, req.query.date);
    const filter = {'createdAt': {
      $gte: new Date(dataFilter)
    }} 
    const post = await Post.find(filter).populate('comments');
    res.status(200).render('index', {posts: post, data: moment });
  }catch(error){
    res.status(404).json({message: error.message})
  }  
}

const getCommentByDate = async (req, res) => {
  try{
    const post = await Post.find().populate({ path: 'comments', options: { sort: {'createdAt': -1}} })
    res.status(200).render('index', {posts: post, data: moment });
  }catch(error){
    res.status(404).json({message: error.message})
  }  
}

const getCommentByCity = async (req, res) => {
  try{
    const city = new RegExp(req.query.city, 'i');
    const posts = await Post.find()
      .populate('user')
      .populate({ path: 'comments', populate: { path: 'user', select:'city nickname', match: { city: city}}})
    const newPosts  = posts.map(post => {
      post.comments = post.comments.filter(com => com.user !== null );
      return post;
    })
    res.status(200).render('index', {posts: newPosts, data: moment });
  }catch(error){
    res.status(404).json({message: error.message})
  }  
}

const updatePost = async (req, res) => {
  const validationSchema = Joi.object({
    title: Joi.string().required(),
  })
  const { value, error } = validationSchema.validate(req.body)
  if(error) return res.status(404).render('posts/edit', {error: error.details[0].message })
  try{
    const updatePost = { title: value.title, _id: req.params.id };
    await Post.findByIdAndUpdate(req.params.id, updatePost, { new: true });
    res.status(200).render(updatePost);
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

const deletePost = async (req, res) => {
  const { id } = req.params;
  try{
    const post = await Post.findByIdAndDelete(id);
    await Comment.findByIdAndDelete({ postId: id })
    res.status(200).json(post);
  }catch(error){
    res.status(404).json(deletePost);
  }  
}

module.exports = { createPost, getPosts, getPost, getPostByDate, getCommentByDate, getCommentByCity, updatePost, deletePost };

