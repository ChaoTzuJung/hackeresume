const express = require('express');
const router = express.Router();
const gravatar = require('gravatar'); // 製作 avatar 套件
const bcrypt = require('bcryptjs'); // 現在 password 只是 plain text 所以我們要幫他做 hash 加密，用 bcryptjs
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input validation
const validateRegisterInput = require('../../util/validation/register');
const validateLoginInput = require('../../util/validation/login');

// Load User model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    // Check Validation - 有錯誤訊息
    if (!isValid) {
        return res.status(400).json(errors)
    }

    // Use mongoose method looking for email in the record, and req.body is in form
    User.findOne({ email: req.body.email })
        // There is already have user with email address
        .then(user => {
            if(user) {
                errors.email = 'Email 已經註冊過 ！！'
                return res.status(400).json(errors);
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
                            .then(user => res.json(user)) // 這邊的資料前端會用axios去post並回傳它
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body)

    // Check Validation - 有錯誤訊息
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email: email })
        // use參數是資料庫的user
        .then(user => {
            // Check for user
            if(!user) {
                errors.email = '沒有這個使用者'
                return res.status(404).json(errors);
            }
            // Check for user
            // text plain password (你輸入的的 password) / hash password (資料庫的 password)
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    // user pass then generate token
                    if(isMatch) {
                        // Use match
                        // craete jwt payload that is what we wnat to include in token, and token have user information
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }
                        // create Sign Token (parload + key + time limit) 3600 接近 1hr
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({ 
                                success: true,
                                token: 'Bearer ' + token // 前面字串可以亂打
                            });
                        });
                    } else {
                        errors.password = '密碼輸入錯誤'
                        return res.status(400).json(errors);
                    }
                })
        })
});

// @route   GET api/users/current
// @desc    Return current users whoever the token belongs to
// @access  Private 
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    })
})

module.exports = router;
