const express = require('express')
const router = express.Router()

// lists all items from the database
router.get('/items', function (req, res) {
    res.send('yay')
})

// list all items that belong to a specific user
router.get('/items/userid', function (req, res) {
    res.send('yay')
})

//  list items that are owned by shopkeepers and are listed for sale
router.get('/items/onsale', function (req, res) {
    res.send('yay')
})

// list items that are owned by registered users and are listed for sale
router.get('/items/offers', function (req, res) {
    res.send('yay')
})

// get information about a specific item by id
router.get('/item/:id', function (req, res) {
    res.send('yay')
})

// creates a new item to the database
router.post('/items', function (req, res) {
    res.send('yay')
})

// modify a specific item by id
router.put('/item/:id', function (req, res) {
    res.send('yay')
})

// delete a specific item from the database by id
router.delete('/item/:id', function (req, res) {
    res.send('deleted!')
})

router.delete('/items/userid', function (req, res) {
    res.send('deleted!')
})

module.exports = router