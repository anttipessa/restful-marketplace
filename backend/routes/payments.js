const express = require('express')
const router = express.Router()
const PaymentController = require('../controllers/payment');

router
  .route('/payments')
  .post(PaymentController.createCard) // create a new credit card item to database
  .get(PaymentController.listCards) // list all payment information from the database

router
  .route('/payments/:id([a-f0-9]{24})')
  .get(PaymentController.showCard) // get information about a specific credit card item by id
  .put(PaymentController.updateCard) // modify a specific credit card item by id
  .delete(PaymentController.deleteCard) // delete a specific creditcard item from the database by id

module.exports = router