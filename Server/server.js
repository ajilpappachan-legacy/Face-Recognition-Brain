const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

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

app.get('/', (req, res) => {
    database('users')
    .returning('*')
    .then(users => {
        res.json(users);
    })
    
})

app.post('/signin', (req, res) => {
    database.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid)
        {
            return database.select('*')
            .from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => {
                res.status(400).json('Unable to get user');
            });
        }
        else {
            res.status(400).json("wrong Credentials");
        }
    })
    .catch(err => {
        res.status(400).json("Wrong Credentials");
    });
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    database.transaction(trx => {
        trx
            .insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                    })
                    .then(user => res.json(user[0]))
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(err => {
            res.status(400).json('Unspecified Error');
        })
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.select('*')
        .from('users')
        .where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            }
            else {
                res.json('No Such User');
            }
        })
        .catch(err => {
            res.status(400).json('Unspecified Error');
        });
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    database('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if (entries.length) {
                res.json(entries[0]);
            }
            else {
                res.json("No such Profile");
            }
        })
        .catch(err => {
            res.status(400).json("Unspecified Error");
        })
})

app.listen(3000, () => {
    console.log("App is working in port 3000");
})