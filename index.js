// implement your API here
const express = require('express');
const server = express();
const User = require('./data/db.js');

server.use(express.json())

server.get('/api/users', (req, res) => {
    User.find()
        .then(data => {
            console.log('happy path');
            res.status(200).json(data);
        })
        .catch(error => {
            console.log('sad path');
            res.json(error)
        });
});

server.listen(3333, () => {
    console.log('listening on 3333')
})
