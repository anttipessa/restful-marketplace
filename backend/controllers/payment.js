const CreditCard = require('../models/creditcard');
const path = 'localhost:3000/'

module.exports = {

     listCards(res) {
        CreditCard.find(function (err, cards) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!cards) { res.sendStatus(404) } else {
                res.status(200);  
                res.json(cards);
            }
        })
    },

    showCard(req, res) {
        CreditCard.findOne({ '_id': req.params.id }, function (err, card) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!card) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/payments/' + card._id)
                res.status(200);
                res.json(card);
            }
        })
    },

    createCard(req, res) {
        if (req.body) {
            console.log('adding card', req.body.name);

            const newCard = new CreditCard({
                number: req.body.number,
                balance: req.body.balance,
                user: req.body.user
            });
            newCard.save(function (err) {
                if (err) { res.sendStatus(400); return console.error(err); };
                console.log("Inserted 1 document into the collection");
                res.status(201);
                res.json(newCard);
            });

        } else {
            res.sendStatus(400);
        }
    },

    updateCard(req, res) {
        CreditCard.findByIdAndUpdate(req.params.id, req.body, { 'new': true }, function (err, card) {
            if (err) { res.sendStatus(400); return console.error(err); };
            if (!card) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/payments/' + card._id);
                res.status(200);
                res.json(card);
                console.log("card updated")
            }
        })
    },

    deleteCard(req, res) {
        CreditCard.findByIdAndDelete(req.params.id, function (err, card) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!card) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/payments/' + card._id);
                res.status(204);
                res.json();
                console.log("card deleted")
            }
        })
    }


}