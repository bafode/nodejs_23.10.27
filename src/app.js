const express = require('express');
const dotenv=require('dotenv')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const hostname = "0.0.0.0";
let port = 3000

dotenv.config()

const server = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo/apinode");

server.use(express.json());
server.use(express.urlencoded({extended:true}));


const postRoute = require("./api/routes/postRoute");
postRoute(server);

const commentRoute = require("./api/routes/commentsRoute");
commentRoute(server);

const userRoute = require("./api/routes/userRoute");
userRoute(server);

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'NODEJS API',
        version: '1.0.0',
        description: 'A sample API for learning nodejs',
      },
      components: {
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header',
            },
        }
      },
      security: {
        bearerAuth: [],
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./api/routes/*.js'],
  };
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


if(process.env.NODE_ENV == 'test') {
  port = 0
}



server.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})


module.exports=server