const validator = require("../helpers/validate");

const saveDevice = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    type: "required|string",
    brand: "required|string",
    model: "required|string",
    specifications: "required",
    price: "required|numeric",
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
        // Validation of 'specifications' being a object
        const specifications = req.body.specifications;
        
        // Validation is object and ( typeof null === 'object')
        if (typeof specifications !== 'object' || specifications === null) {
          return res.status(412).send({
            success: false,
            message: "Validation failed",
            data: {
              specifications: ["The specifications field must be an object."]
            }
          });
        }
        // Validation that field 'processor' is required in specifications and being a string.
        if (typeof specifications.processor !== 'string' || specifications.processor.length === 0) {
          return res.status(412).send({
            success: false,
            message: "Validation failed",
            data: {
              processor: ["The processor field is required and must be a string."]
            }
          });
        }
      next();
    }
  });
};

module.exports = {
  saveDevice,
  
  
};
