const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateEducationInput(data) {
    const errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    // School field is required
    if(Validator.isEmpty(data.school)) {
        errors.school = '學校名稱項目必填';
    }

    // Degree field is required
    if(Validator.isEmpty(data.degree)) {
        errors.degree = '學位項目必填';
    }


    // Field of study is required
    if(Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = '科系項目必填';
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