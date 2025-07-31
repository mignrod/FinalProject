const swaggerAutogen = require('swagger-autogen');

const doc = {
     info: {
        title: 'User Api',
        description: 'Users Api'
     },
     host: '3000cse-341-w03-tnr0.onrender.com',
     schemes: ['https', 'http']
};

const outputfile = './swagger.json';
const endpointsfiles = ['./routes/index.js'];

// this will generate swagger.json

swaggerAutogen(outputfile,endpointsfiles, doc)