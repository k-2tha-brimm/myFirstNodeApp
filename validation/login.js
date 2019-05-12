const Validator = require('validator');
const validText = require('./valid-text');

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.handle = validText(data.handle) ? data.handle : ''
    data.password = validText(data.password) ? data.password : ''

    if(Validator.isEmpty(data.handle)) {
        errors.handle = "Handle field is required";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}