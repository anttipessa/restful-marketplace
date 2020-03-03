const express = require('express')
const router = express.Router()
const ItemController = require('../controllers/item');

// lists all items from the database
router.get('/items', function (req, res) {
    ItemController.listItems(res)
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
router.get('/items/:id', function (req, res) {
    ItemController.showItem(req, res)
})

// creates a new item to the database
router.post('/items', function (req, res) {
    ItemController.createItem(req, res)
})

// modify a specific item by id
router.put('/items/:id', function (req, res) {
    ItemController.updateItem(req, res)
})

// delete a specific item from the database by id
router.delete('/items/:id', function (req, res) {
    ItemController.deleteItem(req, res)
})

router.delete('/items/userid', function (req, res) {
    res.send('deleted!')
})

module.exports = router