const User = require('../models/user');
const path = 'localhost:3000/'

const errorMessage = { 'status': 'error' }

module.exports = {

    async listUsers(req, res) {
        const users = await User.find({})
                .sort('_id')
                .populate('offers')
                .populate('creditcard')
        return res.status(200).json(users)
    },

    async showUser(req, res) {
        try {
            const user = await User.findOne({ '_id': req.params.id })
                    .populate('offers')
                    .populate('creditcard')
            if (!user) {
                errorMessage.error = `User with ID ${req.params.id} was not found`
                return res.status(404).json(errorMessage)
            }
            res.set('Location', `${path}api/items/${user._id}`)
            return res.status(200).json(user)
        } catch (err) {
            errorMessage.errors = err.errors
            return res.status(500).json(errorMessage)
        }
    },

    createUser(req, res) {
        const { name, password, email, creditcard } = req.body
        if (name && password && email) {
            console.log('Adding user', name);

            const newUser = new User({
                name,
                email,
                password,
                creditcard
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