const User = require('../models/user');
const path = 'localhost:3000/'

module.exports = {

    listUsers(res) {
        User.find(function (err, users) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!users) { res.sendStatus(404) } else {
                res.status(200);
                res.json(users);
            }
        })
    },

    showUser(req, res) {
        User.findOne({ '_id': req.params.id }, function (err, user) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!user) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/users/' + user._id)
                res.status(200);
                res.json(user);
            }
        })
    },

    createUser(req, res) {
        if (req.body && req.body.name) {
            console.log('adding user', req.body.name);

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            newUser.save(function (err) {
                if (err) { res.sendStatus(400); return console.error(err); };
                console.log("Inserted 1 document into the collection");
                res.status(201);
                res.json(newUser);
            });

        } else {
            res.sendStatus(400);
        }
    },

    updateUser(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { 'new': true }, function (err, user) {
            if (err) { res.sendStatus(400); return console.error(err); };
            if (!user) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/users/' + user._id);
                res.status(200);
                res.json(user);
            }
        })
    },

    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.id, function (err, user) {
            if (err) { res.sendStatus(404); return console.error(err); };
            if (!user) { res.sendStatus(404) } else {
                res.set('Location', path + 'api/users/' + user._id);
                res.status(204);
                res.json();
                console.log(user.name + " deleted!")
            }
        })
    }


}