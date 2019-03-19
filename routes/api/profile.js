const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // dealing with database
const passport = require('passport'); // protect the route

// Load validdation
const validateProfileInput  = require('../../util/validation/profile');

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
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = '使用者還沒創建履歷'
                return res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(errors))
});

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check validation 
    if(!isValid) {
        // return any error with 400 status
        return res.status(400).json(errors)
    }
    // Get field
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Skills spilt into array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(','); // '1,2,3,4' => [1,2,3,4]
    }

    // Soical
    profileFields.soical = {};
    if(req.body.youtube) profileFields.soical.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.soical.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.soical.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.soical.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.soical.instagram = req.body.instagram;

    // 找 logged 的 人
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile) {
                // If there is profile that means we want to update profile(profileFields是一個大物件)
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            } else {
                // Create new profile

                // Check if handle exist (handle is for SEO  and to access the profile page)
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if(profile) {
                            errors.handle = 'Handle 已經存在'
                            res.status(400).json(errors)
                        }

                        // new Profile
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    });
            } 
        }) 
});

module.exports = router
