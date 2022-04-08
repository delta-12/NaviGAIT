const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateVideoUploads(req) {
    
    let errors = {}
    
    req.body.title = !isEmpty(req.body.title) ? req.body.title : ""
    req.body.dateUploaded = !isEmpty(req.body.dateUploaded) ? req.body.dateUploaded : ""

    if (Validator.isEmpty(req.body.title)) {
      errors.title = "Title is required"
    }
    if (Validator.isEmpty(req.body.dateUploaded)) {
      errors.dateUploaded = "Date uploaded is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}