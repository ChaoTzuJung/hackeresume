const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // dealing with database
const passport = require('passport'); // protect the route

// Load validdation
const validateProfileInput  = require('../../util/validation/profile');
const validateExperienceInput  = require('../../util/validation/experience');
const validateEducationInput  = require('../../util/validation/education');

// Load profile model
const profile = require('../../models/Profile');
// Load user model
const User = require('../../models/User');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private

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
        .catch(err => res.status(404).json(err))
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofile = '目前沒有任何履歷'
            return res.status(404).json(errors)
        }
        res.json(profiles)
    })
    .catch(err => res.status(404).json({ profile: '沒有這個使用者的履歷' }))
})

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle' , (req, res) => {
    const error = {};

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                error.noprofile = '使用者尚未創建履歷';
                res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
});

// @route   GET api/profile/user/:user_id 
// @desc    Get profile by user ID
// @access  Public

// 因為是 Public route 所以不用 passport.authenticate(
    router.get('/user/:user_id' , (req, res) => {
        const error = {};
    
        Profile.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if(!profile) {
                    error.noprofile = '使用者尚未創建履歷';
                    res.status(404).json(errors);
                }
                res.json(profile)
            })
            // 這邊不回傳 err 是因為 err 是 mongoose的錯誤訊息，當找不到user ID 應該要客製化錯誤訊息
            .catch(err => res.status(404).json({ profile: '沒有這個使用者的履歷' }))
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

    // social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

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

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //Check validation 
    if(!isValid) {
        // return any error with 400 status
        return res.status(400).json(errors)
    }
    // find by the logged in users (userSchema 內有 user : objectId)
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            locaton: req.body.locaton,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }

        // Add to exp array (can't use push)
        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile))
    })
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //Check validation 
    if(!isValid) {
        // return any error with 400 status
        return res.status(400).json(errors)
    }
    // find by the logged in users (userSchema 內有 user : objectId)
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }

        // Add to edu array (can't use push)
        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile))
    })
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        // Get remove index (profile.experience is array)
        const removeIndex = profile.experience
            // 列出所有 exp_id
            .map(item => item.id)
            // 符合 url 上的 id
            .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        // Get remove index (profile.education is array)
        const removeIndex = profile.education
            // 列出所有 edu_id
            .map(item => item.id)
            // 符合 url 上的 id
            .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
})

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // 刪除 Profile collectio
    Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
        User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true }))
    })
    // 刪除 User collection
    .catch(err => res.status(404).json(err));
})

module.exports = router
