const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // dealing with database
const passport = require('passport'); // protect the route

// Load profile model
const profile = require('../../models/Profile');
// Load user model
const User = require('../../models/User');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private

//我們無法使用 api/profile/:id
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {}
    // want to fetch current user profile, 因為有做 protect 所以先拿到 token (that is put the user into request for user.)
    // 透過 profile schema 的欄位 find one record，得知有 user 且type 是 ObjectId，req.user.id 是 logged user 的 information
    Profile.findOne({ user: req.user.id  })
        .then(profile => {
            if(!profile) {
                errors.noprofile = '使用者還沒創建履歷'
                return res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(errors))
});

module.exports = router
