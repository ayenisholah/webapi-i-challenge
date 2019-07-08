// implement your API here
const express = require('express');
const server = express();
const User = require('./data/db.js');

server.use(express.json())