const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

users = [
    {
        id: '123',
        name: 'Ajil',
        email: 'ajilpappachan@gmail.com',
        password: 'jamesbond',
        entries: 0,
        joined: new Date()
    }
];

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === users[0].email && req.body.password === users[0].password) {
        res.json(users[0]);
    }
    else {
        res.json('Fail');
    }
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    users.push({
        id: '124',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(users[users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.json("No such user");
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.json("No such user");
    }
})

app.listen(3000, () => {
    console.log("App is working in port 3000");
})