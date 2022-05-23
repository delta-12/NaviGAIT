const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateVideoUploads(req) {

    const types = ["video/mp4", "video/quicktime"]
    
    let errors = {}
    
    req.body.title = !isEmpty(req.body.title) ? req.body.title : ""

    if (Validator.isEmpty(req.body.title)) {
      errors.title = "Title is required"
    }
    if (req.files.length === 0) {
      errors.files = "Select a video file"
    }
    else {
      for(let i = 0; i < req.files.length; i++) {
        if (types.every(type => req.files[i].mimetype !== type)) {
          errors.files = "'"+req.files[i].mimetype+"' is not a supported format\n";
        }
      }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}