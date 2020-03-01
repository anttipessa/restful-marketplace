const express = require('express')
const router = express.Router()

//  list all payment information from the database
router.get('/payments', function (req, res) {
    res.send('money')
})

// get information about a specific credit card item by id
router.get('/payment/:id', function (req, res) {
    res.send('money!')
})

// create a new credit card item to database
router.post('/payments/', function (req, res) {
    res.send('moremoney')
})

// modify a specific credit card item by id
router.put('/payment/:id', function (req, res) {
    res.send('money!')
})

// delete a specific creditcard item from the database by id
router.delete('/payment/:id', function (req, res) {
    res.send('delete money!')
})

module.exports = router