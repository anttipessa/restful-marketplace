const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user');

router
  .route('/users')
  .get(UserController.listUsers) // list all users from the database
  .post(UserController.createUser) // add new user to database

router
  .route('/users/:id([a-f0-9]{24})')
  .get(UserController.showUser) // get information about a specific user by id
  .put(UserController.updateUser) // modify a specific user by id
  .delete(UserController.deleteUser) // delete a specific user from the database by id

// get a single users credit card / payment information
router.get('/users/:id([a-f0-9]{24})/payment', function (req, res) {
  res.send('get by id')
})

module.exports = router