const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./signin');
const register = require('./register');
const profile = require('./register');
const image = require('./image');

const database = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'smartbrain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {database('users').returning('*').then(users => res.json(users))});
app.post('/signin', (req, res) => {signin.handleSignIn(req,res,database,bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, database, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, database)});
app.put('/image', (req, res) => {image.handleImage(req, res, database)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(3000, () => {
    console.log("App is working in port 3000");
})