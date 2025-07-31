const swaggerAutogen = require('swagger-autogen');

const doc = {
     info: {
        title: 'User Api',
        description: 'Users Api'
     },
     host: 'cse341-team06.onrender.com',
     schemes: ['https', 'http']
};

const outputfile = './swagger.json';
const endpointsfiles = ['./routes/index.js'];

// this will generate swagger.json

swaggerAutogen(outputfile,endpointsfiles, doc)