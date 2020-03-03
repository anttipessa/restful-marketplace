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
        })
    },

    showItem(req, res) {
        Item.findOne({ '_id': req.params.id }, function (err, item) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!item) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/items/' + item._id)
                res.status(200);
                res.json(item);
            }
        })
    },

    createItem(req, res) {
        if (req.body && req.body.name) {
            console.log('adding item', req.body.name);

            const newItem = new Item({
                name: req.body.name,
                price: req.body.price,
                onsale: req.body.onsale
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
        })
    },

    deleteItem(req, res) {
        Item.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!item) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/items/' + item._id);
                res.status(204);
                res.json();
                console.log(item.name + " deleted!")
            }
        })
    }


}