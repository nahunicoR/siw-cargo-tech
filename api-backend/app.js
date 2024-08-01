const express = require('express')
const cors = require('cors')
const appRouter = require('./router/app.router')
require('./database/config.database')
const server = express();

server.use(cors());
server.use(express.json());


server.use('/api/usuarios', appRouter);


module.exports = server;