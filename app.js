const cors = require('cors')();
const express = require('express');
const app = express();
app.enable('trust proxy');
require('dotenv').config;
const bluebird = require('bluebird');
global.fs = bluebird.promisifyAll(require('fs'));
const bodyParser = require('body-parser');
global.publicDir = __dirname + "/public/";
global.userPrefix = 'user';
global.adminPrefix = 'admin';
app.use(cors);
app.options('*', cors);
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));
app.use('/img', express.static(__dirname+'/public/img'));
app.use(require("./lib/express-router"));
let server = require('http').createServer(app);
const io = require("socket.io").listen(server);
process.on('unhandledRejection', r => console.log(r));
server.listen(process.env.MAIN_PORT, function () {
    console.log("Listening on " + process.env.MAIN_PORT);
});