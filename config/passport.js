const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// search for the users that come with payload
const mongoose = require('mongoose');
// users 來自 models/User.js 的宣告
// const User = mongoose.model('users'); 課程錯誤的寫法
const User = require('../models/User');
// send along secret key with request, so we need validate it
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

// 有 passport 參數是因為 server.js require 時(29行) 需要參數
module.exports = passport => {
    // jwt_payload 內涵 user stuff we include in api/user.js (84行)
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        // 得到Token後，send token to user
        User.findById(jwt_payload.id)
            .then(user => {
                // user is bean found
                if(user) {
                    // null error / return user
                    return done(null, user);
                }
                // null error / no user
                return done(null, false);
            })
            .catch(err => console.log(err));
    }))
}