const express = require('express');
const { getPosts, getPost, getPostByDate, getCommentByDate, createPost, updatePost, deletePost, getCommentByCity } = require('../controller/post');

const router = express.Router();

router.get('/', getPosts);
router.get('/date/', getPostByDate);
router.get('/comments/date/', getCommentByDate);
router.get('/comments/city/', getCommentByCity);
router.get('/:id', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;