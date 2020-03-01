const express = require('express')
const router = express.Router()
const User = require('../models/user');

const path = 'localhost:3000/'

// GET REQUESTS

//  list all users from the database
router.get('/users', function (req, res) {
    User.find(function (err, users) {
        if (err) { res.sendStatus(404); return console.error(err); };
        if (!users) { res.sendStatus(404) } else {
            res.status(200);
            res.json(users);
        }
    })
})

// get information about a specific user by id
router.get('/user/:id', function (req, res) {
    User.findOne({'_id':req.params.id},function (err, user) {
        if (err) {res.sendStatus(404); return console.error(err);};
        if (!user) {res.sendStatus(404)} else {
          res.set('Location', path+'api/user/'+user._id)
          res.status(200);
          res.json(user);
        }
      })
})

//  list all items that belong to a specific user and are listed for sale
router.get('/user/:id/offers', function (req, res) {
    res.send('get by id')
})

// get a single user credit card / payment information
router.get('/user/:id/payment', function (req, res) {
    res.send('get by id')
})

// POST REQUESTS

//  add new user to database
router.post('/users', function (req, res) {
    if (req.body && req.body.name) {
        console.log('adding user', req.body.name);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        newUser.save(function (err) {
            if (err) { res.sendStatus(400); return console.error(err); };
            console.log("Inserted 1 document into the collection");
            res.status(201);
            res.json(newUser);
        });

    } else {
        res.sendStatus(400);
    }

})

// PUT REQUESTS

// modify a specific user by id
router.put('/user/:id', function (req, res) {
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body, {'new':true}, function (err, user) {
    if (err) {res.sendStatus(400); return console.error(err);};
    if (!user) {res.sendStatus(404)} else {
      res.set('Location', path+'api/user/'+user._id);
      res.status(200);
      res.json(user);
    }
  })
})

// DELETE REQUESTS

//  delete a specific user from the database by id
router.delete('/user/:id', function (req, res) {
    User.findByIdAndDelete(req.params.id,function (err, user) {
        if (err) {res.sendStatus(404); return console.error(err);};
        if (!user) {res.sendStatus(404)} else {
          res.set('Location', path+'api/user/'+user._id);
          res.status(204);
          res.json();
          console.log(user.name +" deleted!")
        }
      })
})

module.exports = router