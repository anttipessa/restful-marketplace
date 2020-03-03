const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user');


// GET REQUESTS

//  list all users from the database
router.get('/users', function (req, res) {
  UserController.listUsers(res)
})

// get information about a specific user by id
router.get('/users/:id', function (req, res) {
  UserController.showUser(req, res)
})

//  list all items that belong to a specific user and are listed for sale
router.get('/users/:id/offers', function (req, res) {
  res.send('get by id')
})

// get a single user credit card / payment information
router.get('/users/:id/payment', function (req, res) {
  res.send('get by id')
})

// POST REQUESTS

//  add new user to database
router.post('/users', function (req, res) {
  UserController.createUser(req, res)
})

// PUT REQUESTS

// modify a specific user by id
router.put('/users/:id', function (req, res) {
  UserController.updateUser(req, res)
})

// DELETE REQUESTS

//  delete a specific user from the database by id
router.delete('/users/:id', function (req, res) {
  UserController.deleteUser(req, res)
})

module.exports = router