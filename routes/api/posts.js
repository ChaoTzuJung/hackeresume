const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create post
// @access  Private 
router.post('/', passport.authenticate('jwt', { session: fasle }), (req, res) => {
    // 建立collection的第一份資料
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.body.id
    })
    // post 參數應該就是 newPost 物件
    newPost.save().then(post => res.json(post));
});

module.exports = router