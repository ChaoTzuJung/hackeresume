const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    const errors = {};

    // data 的 name 是 空的就給空字串
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = '使用者名稱必須在2~30字之間';
    }

    // name field don't want to empty
    if(Validator.isEmpty(data.name)) {
        errors.name = '使用者名稱必填';
    }

    // email field is required
    if(Validator.isEmpty(data.email)) {
        errors.email = 'email必填';
    }

    // Email is invalid
    if(!Validator.isEmail(data.email)) {
        errors.email = 'email格式不對';
    }

    // password field is required
    if(Validator.isEmpty(data.password)) {
        errors.password = '密碼必填';
    }

    // password field is required
    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = '密碼至少6碼';
    }

    // comfirm password field is required 
    if(Validator.isEmpty(data.password2)) {
        errors.password2 = '認證密碼必填';
    }

    // password must match comfirm password
    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = '認證密碼與密碼不符';
    }
    
    return {
        errors,
        isValid: isEmpty(errors) // 有錯誤訊息就是 False
    }
}