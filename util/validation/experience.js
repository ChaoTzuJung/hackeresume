const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateExperienceInput(data) {
    const errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    // Job title field is required
    if(Validator.isEmpty(data.title)) {
        errors.title = '標題必填';
    }

    // Company field is required
    if(Validator.isEmpty(data.company)) {
        errors.company = '公司名稱必填';
    }

    // From date field is required
    if(Validator.isEmpty(data.from)) {
        errors.from = '開始日期必填';
    }

    return {
        errors,
        isValid: isEmpty(errors) // 有錯誤訊息就是 False
    }
}