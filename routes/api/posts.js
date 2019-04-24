const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// Profile model
const Profile = require('../../models/Profile');


// Validation
const validatePostInput = require('../../util/validation/post');

// @route   Get api/posts
// @desc    Get all posts
// @access  Public (不 care 是否有登入才能看到資料)
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   Get api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID' }));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private 
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check out Validation
    if(!isValid) {
        // If any error, send 400 with error object
        return res.status(400).json(errors);
    }
    // 建立collection的第一份資料
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id // 如何知道接 user ?
    })

    // post 參數應該就是 newPost 物件
    newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete posts
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // 確認刪除的是自己的 post
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
            .then(post => {
                // Check for post owner
                if(post.user.toString() !== req.user.id) {
                    // Unauthorized: 防止有人想透過postman亂刪除別人文章
                    return res.status(401).json({ notauthorized: 'User not authorized' });
                }
                // Delete
                post.remove().then(() => res.json({ success: true }));
            })
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
});

// @route   POST api/posts/like/:id
// @desc    Like posts
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // 確認刪除的是自己的 post
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
            .then(post => {
                // 由 Post model 宣告的 schema 可以知道 post.likes 是 array
                // length > 0 表示 你已經按過讚
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    res.status(400).json({ alreadyliked: 'User already liked this post' })
                }

                // Add user id to likes array
                post.likes.unshift({ user: req.user.id });

                post.save().then(post => res.json(post));
            })
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike posts
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Find User
    Profile.findOne({ user: req.user.id })
        // Get Profile
        .then(profile => {
            Post.findById(req.params.id)
            .then(post => {
                // Find if user is already in the array (LIKE array)
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                    // 若like array 沒人按過讚
                    res.status(400).json({ notliked: 'You have not yet like this post' })
                }

                // Get the Remove index
                const removeIndex = post.likes
                    .map(like => like.user.toString())
                    .indexOf(req.user.id);

                // splice out of array 從removeIndex 刪除/取代/新增 1個 Like
                post.likes.splice(removeIndex, 1);

                // Save
                post.save().then(post => res.json(post));
            })
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
});

module.exports = router