// implement your API here
const express = require('express');
const server = express();
const User = require('./data/db.js');

server.use(express.json())

// Read - Get the list of Users
server.get('/api/users', (req, res) => {
    User.find()
        .then(data => {
            console.log('happy path');
            res.status(200).json(data);
        })
        .catch(({ code, message }) => {
            res.status(500).json({ err: 'The users information could not be retrieved.' });
        });
});

// Post - Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    User.insert(newUser)
    .then(addedUser => {
        if(newUser.name === null || newUser.bio === null){
            res.status(400).json({ err: 'Please provide name and bio for the user.' })
        } else {
            res.status(201).json(addedUser);
        }
    })
    .catch(({ code, message }) => {
        res.status(500).json({ err: 'There was an error while saving the user to the database' });
    });
});

// Delete - Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    User.remove(id)
    .then(removedUser => {
        res.json(removedUser);
    })
    .catch(({ code, message }) => {
        res.status(404).json({ err: 'The user with the specified ID does not exist.' });

    });
});

//Update - Updates the user with the specified id using data from the request body
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    User.update(id, changes)
    .then(updatedHub => {
        if (updatedHub) {
            res.json(updatedHub)
        } else {
            res.status(404).json({ err: 'The user with the specified ID does not exist.' })
        }
    })
    .catch(({ code, message }) => {
        res.status(404).json({ err: 'The user with the specified ID does not exist.' })
    });
});

server.listen(3333, () => {
    console.log('listening on 3333')
})
