const Item = require('../models/item');
const path = 'localhost:3000/'

module.exports = {

    listItems(res) {
        Item.find(function (err, items) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!items) { res.sendStatus(404) } else {
                res.status(200);
                res.json(items);
            }
        }).populate('user')
    },

    listOffers(res) {
        Item.find({ onsale: true }, function (err, item) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!item) { res.sendStatus(404) } else {
                res.status(200);
                res.json(item);
            }
        }).populate('user')
    },

    listOffersByUser(req, res) {
        Item.find({ onsale: true , user: req.params.id}, function (err, item) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!item) { res.sendStatus(404) } else {
                res.status(200);
                res.json(item);
            }
        }).populate('user')
    },

    listByUser(req, res) {
        Item.find({ user: req.params.id }, function (err, item) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!item) { res.sendStatus(404) } else {
                res.status(200);
                res.json(item);
            }
        }).populate('user')
    },

    showItem(req, res) {
        Item.findOne({ '_id': req.params.id }, function (err, item) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!item) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/items/' + item._id)
                res.status(200);
                res.json(item);
            }
        }).populate('user')
    },

    createItem(req, res) {
        if (req.body && req.body.name) {
            console.log('adding item', req.body.name);

            const newItem = new Item({
                name: req.body.name,
                price: req.body.price,
                onsale: req.body.onsale,
                user: req.body.user
            });
            newItem.save(function (err) {
                if (err) { res.sendStatus(400); return console.error(err); };
                console.log("Inserted 1 document into the collection");
                res.status(201);
                res.json(newItem);
            });

        } else {
            res.sendStatus(400);
        }
    },

    updateItem(req, res) {
        Item.findByIdAndUpdate(req.params.id, req.body, { 'new': true }, function (err, item) {
            if (err) { res.sendStatus(400); return console.error(err); };
            if (!item) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/items/' + item._id);
                res.status(200);
                res.json(item);
                console.log("item updated")
            }
        }).populate('user')
    },

    deleteItem(req, res) {
        Item.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!item) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/items/' + item._id);
                res.status(204);
                res.json(item)
                console.log("deleted!")
            }
        })
    },

    deleteItemUser(req, res) {
         Item.deleteMany({ user: req.params.id }, function (err, item) {
            console.log(req.params.userid)
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!item) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/items/' + item._id);
                res.status(204);
                res.json(item)
                console.log("deleted!")
            }
        })
    }

}