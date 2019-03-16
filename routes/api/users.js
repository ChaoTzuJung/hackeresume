const express = require('express');
const router = express.Router();
const gravatar = require('gravatar'); // 製作 avatar 套件
const bcrypt = require('bcryptjs'); // 現在 password 只是 plain text 所以我們要幫他做 hash 加密，用 bcryptjs

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public 
router.get('/test', (req, res) => res.json({msg: 'Users work!'}));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    // Use mongoose method looking for email in the record, and req.body is in form
    User.findOne({ email: req.body.email })
        // There is already have user with email address
        .then(user => {
            if(user) {
                return res.status(400).json({ email: "Email 已經註冊過 ！！" })
            } else {
                // 透過email建立avatar
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                // genSalt 回傳 error 跟 salt
                bcrypt.genSalt(10, (err, salt) => {
                    // 拿到 salt 就可以 create our hash or password 透過 salt + password 打散
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // salt 跟 password 合體且 hash 過後，回傳 error 跟 hash
                        if(err) throw err;
                        // 把 hash(加密過的password)放到 newUser.password
                        newUser.password = hash;
                        // 儲存 newUser 到 mongoose
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

module.exports = router;
