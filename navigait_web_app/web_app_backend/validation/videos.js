const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateVideoUploads(req) {
    
    let errors = {}
    
    req.body.title = !isEmpty(req.body.title) ? req.body.title : ""
    req.body.fullTitle = !isEmpty(req.body.fullTitle) ? req.body.fullTitle : ""

    if (Validator.isEmpty(req.body.title)) {
      errors.title = "Title is required"
    }
    if (Validator.isEmpty(req.body.fullTitle)) {
      errors.fullTitle = "Full title is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}