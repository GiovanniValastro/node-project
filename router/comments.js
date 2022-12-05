const express = require('express');
const router = express.Router();
const { getComment, createComment, updateComment, deleteComment } = require('../controller/comments');

router.get('/:id', getComment);
router.post('/', createComment);
router.patch('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;