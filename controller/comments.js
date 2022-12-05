const mongoose = require('mongoose');
const Comment = require('../model/Comments');
const Posts = require('../model/Post');
const Joi = require('joi');

const createComment = async (req, res) => {
  const validationSchema = Joi.object({
    text: Joi.string().required(),
    postId: Joi.string().required()
  })
  const { value, error } = validationSchema.validate(req.body)
  try{   
    if(error) { 
      const posts = await Posts.find().populate('comments') 
      return res.status(404).render('index', {error: error.details[0].message, posts: posts })
    }else{  
      const post = await Posts.findById(value.postId);
      if(!post) return res.status(400).json({message: 'No posts found'})
      const newComment = new Comment({...value, user: req.session.context}); 
      await Posts.findByIdAndUpdate({_id: value.postId}, {
      $push: {comments: newComment._id}}, { new: true})
      await newComment.save();
      res.status(200).redirect('/post');
    }
  }catch(error){
    res.status(400).json({message: error.message});
  }   
} 

const getComment = async (req, res) => {
  try{
    const comment = await Comment.findById(req.params.id);
    res.status(200).render('posts/comment', {comment: comment });
  }catch(error){
    res.status(404).json({message: error.message})
  }  
}

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Comment with ${id}`);

  try{
    const updateComment = await Comment.findByIdAndUpdate(id, { text }, { new: true } );
    res.status(200).json({...updateComment._doc, creator: req.creator})
  }catch(error){
    res.status(404).json({message: error.message});
  }
}

const deleteComment = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Comment with ${id}`);

  try{
    const { postId } = await Comment.findByIdAndDelete(id)
    res.status(200).json({ id, postId })
  }catch(error){
    res.status(404).json({message: error.message});
  }
}

module.exports = { getComment, createComment, updateComment, deleteComment };