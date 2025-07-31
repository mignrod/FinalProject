const Validator = require("validatorjs");
const moment = require('moment'); 

Validator.register('date_format', function(value, format, attribute) {
  // 'value' es el valor del campo (ej. "2000-08-08")
  // 'format' es el formato que le pasamos (ej. "YYYY-MM-DD")
  // `moment(value, format, true).isValid()` verifica si el valor es una fecha válida EN ESE FORMATO.
  // El 'true' en el tercer argumento de moment() indica "strict parsing" (parseo estricto).
  return moment(value, format, true).isValid();
}, 'The :attribute must be in :date_format format.');


const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;
