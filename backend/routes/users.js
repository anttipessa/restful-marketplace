const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const UserController = require('../controllers/user');

router
  .route('/login')
  .post(UserController.login) // login with credentials

router
  .route('/users')
  .get(UserController.listUsers) // list all users from the database
  .post(UserController.createUser) // add new user to database

router
  .route('/users/:id([a-f0-9]{24})')
  .all(auth.ensureAuthenticated)
  .get(UserController.showUser) // get information about a specific user by id
  .put(UserController.updateUser) // modify a specific user by id
  .delete(auth.ensureAdmin, auth.ensureNotSelf, UserController.deleteUser) // delete a specific user from the database by id

module.exports = router