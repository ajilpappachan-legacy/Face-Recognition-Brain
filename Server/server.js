const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const home = require('./home');
const signin = require('./signin');
const register = require('./register');
const profile = require('./register');
const image = require('./image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const database = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {home.handleHomeScreen(req, res)});
app.post('/signin', (req, res) => {signin.handleSignIn(req,res,database,bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, database, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, database)});
app.put('/image', (req, res) => {image.handleImage(req, res, database)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is working in port ${process.env.PORT}`);
})