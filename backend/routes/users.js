const express = require('express')
const router = express.Router()

// GET REQUESTS

//  list all users from the database
router.get('/users', function (req, res) {
    res.send('ALL users are HERE')
})

// get information about a specific user by id
router.get('/user/:id', function (req, res) {
    res.send('get by id')
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
    res.send('new user yay!')
})

// PUT REQUESTS

// modify a specific user by id
router.put('/user/:id', function (req, res) {
    res.send('changed')
})

// DELETE REQUESTS

//  delete a specific user from the database by id
router.delete('/users/:id', function (req, res) {
    res.send('del user')
})

module.exports = router