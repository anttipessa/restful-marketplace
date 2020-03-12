const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const UserController = require('../controllers/user');

router
  .route('/login')
  .post(UserController.login) // login with credentials

router
  .route('/users')
  .post(UserController.createUser) // add new user to database
  .get(auth.verifyAuth, auth.ensureAdmin, UserController.listUsers) // list all users from the database

router
  .route('/users/:id([a-f0-9]{24})')
  .all(auth.verifyAuth)
  .get(auth.ensureSelf, UserController.showUser) // get information about a specific user by id
  .put(auth.ensureSelf, UserController.updateUser) // modify a specific user by id
  .delete(auth.ensureAdmin, auth.ensureNotSelf, UserController.deleteUser) // delete a specific user from the database by id

router
  .route('/users/:id([a-f0-9]{24})/role')
  .all(auth.verifyAuth)
  .put(auth.ensureAdmin, UserController.changeRole)

module.exports = router