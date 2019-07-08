// implement your API here
const express = require('express');
const server = express();
const User = require('./data/db.js');

server.use(express.json())

// Read - Get the list o
server.get('/api/users', (req, res) => {
    User.find()
        .then(data => {
            console.log('happy path');
            res.status(200).json(data);
        })
        .catch(({ code, message }) => {
            res.status(404).json({ err: 'Not Found' });
        });
});

// Create - Add a new user to the list
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log(req.body)
    User.insert(newUser)
    .then(addedUser => {
        res.status(201).json(addedUser)
    })
    .catch(({ code, message }) => {
        res.status(500).json({ err: 'There was an error while saving the user to the database' })
    })
})

server.listen(3333, () => {
    console.log('listening on 3333')
})
