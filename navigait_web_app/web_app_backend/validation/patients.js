const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validatePatients(req) {
    
    let errors = {}
    
    req.body.name = !isEmpty(req.body.name) ? req.body.name : ""

    if (Validator.isEmpty(req.body.name)) {
      errors.name = "Name is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}