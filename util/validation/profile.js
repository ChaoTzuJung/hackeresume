const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
    const errors = {};

    // 登入只需要 email 與 password
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';


    // Email is invalid
    if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'handle必須在2到40個文字之間';
    }

    // profile handle is required
    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'profile handle 必填';
    }

    // status field is required
    if(Validator.isEmpty(data.status)) {
        errors.status = 'status 必填';
    }

    // skills field is required
    if(Validator.isEmpty(data.skills)) {
        errors.skills = 'skills 必填';
    }

    // Not a valid URL
    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = '不是有效的 URL';
        }
    }

    // Not a valid URL
    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = '不是有效的 URL';
        }
    }

    // Not a valid URL
    if(!isEmpty(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = '不是有效的 URL';
        }
    }

    // Not a valid URL
    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = '不是有效的 URL';
        }
    }

    // Not a valid URL
    if(!isEmpty(data.linkedin)) {
        if(!Validator.isURL(data.linkedin)) {
            errors.linkedin = '不是有效的 URL';
        }
    }
    
    // Not a valid URL
    if(!isEmpty(data.instagram)) {
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = '不是有效的 URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors) // 有錯誤訊息就是 False
    }
}