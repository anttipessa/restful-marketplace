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

/*
 * Ei välttämättä tarvita, koska credit card tiedot näkyvät
 * käyttäjän tiedoissa: /users/id
router
  .route('/users/:id([a-f0-9]{24})/payment')
  .get(UserController.viewCard) // get a single users credit card / payment information
*/

module.exports = router