const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
    const errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    // Post must be between 10 and 300 characters
    if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = '字數必須至少10字，至多300字';
    }

    // Text is invalid
    if(Validator.isEmpty(data.text)) {
        errors.text = '內文欄位必填';
    }

    return {
        errors,
        isValid: isEmpty(errors) // 有錯誤訊息就是 False
    }
}