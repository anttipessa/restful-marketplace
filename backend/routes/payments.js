const express = require('express')
const router = express.Router()
const PaymentController = require('../controllers/payment');

//  list all payment information from the database
router.get('/payments', function (req, res) {
    PaymentController.listCards(res)
})

// get information about a specific credit card item by id
router.get('/payments/:id', function (req, res) {
    PaymentController.showCard(req, res)
})

// create a new credit card item to database
router.post('/payments', function (req, res) {
    PaymentController.createCard(req, res)
})

// modify a specific credit card item by id
router.put('/payments/:id', function (req, res) {
    PaymentController.updateCard(req, res)
})

// delete a specific creditcard item from the database by id
router.delete('/payments/:id', function (req, res) {
    PaymentController.deleteCard(req, res)
})

module.exports = router