const validator = require("../helpers/validate");

const saveDevice = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    type: "required|string",
    brand: "required|string",
    model: "required|string",
    specifications: "required",
    price: "required",
    releaseDate: "required|date|date_format:YYYY-MM-DD"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
/** 
const saveClasses = (req, res, next) => {
  const validationRule = {
    course_code: "required|string",
    course_name: "required|string",
    rolled_students: "array|min:0",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
*/
module.exports = {
  saveDevice,
  
  
};
