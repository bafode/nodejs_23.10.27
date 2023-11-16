const express = require('express');
const dotenv=require('dotenv')
const hostname = "0.0.0.0";
const port = 3000

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


server.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})