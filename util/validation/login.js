const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
    const errors = {};

    // 登入只需要 email 與 password
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Email is invalid
    if(!Validator.isEmail(data.email)) {
        errors.email = 'email格式不對';
    }

    // email field is required (需在 格式不對 以下 才優先使用這個validation)
       if(Validator.isEmpty(data.email)) {
        errors.email = 'email必填';
    }

    // password field is required
    if(Validator.isEmpty(data.password)) {
        errors.password = '密碼必填';
    }
    
    return {
        errors,
        isValid: isEmpty(errors) // 有錯誤訊息就是 False
    }
}