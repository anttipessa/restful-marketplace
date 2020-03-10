const User = require('../models/user')
const CreditCard = require('../models/creditcard')
const Item = require('../models/item')

const errorMessage = { 'status': 'error' }

module.exports = {

  async createUser(req, res) {
    const { name, password, email } = req.body
    if (name && password && email) {
      console.log('Adding user', name)
      const newUser = new User({
        name,
        email,
        password
      })
      try {
        await newUser.save()
        return res.status(201).json(newUser)
      } catch (err) {
        errorMessage.error = err.message
        return res.status(400).json(errorMessage)
      }
    } else {
      errorMessage.error = 'The following fields are required: name, email, password'
      res.status(400).json(errorMessage)
    }
  },
  
  async listUsers(req, res) {
    const users = await User.find({})
      .sort('_id')
    return res.status(200).json(users)
  },

  async showUser(req, res) {
    try {
      const user = await User.findOne({ '_id': req.params.id })
        .populate('creditcard')
      if (!user) {
        errorMessage.error = `User with ID: ${req.params.id} was not found`
        return res.status(404).json(errorMessage)
      }
      res.set('Location', `/api/items/${user._id}`)
      return res.status(200).json(user)
    } catch (err) {
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  },

  async updateUser(req, res) {
    const { name, email, password, role, creditcard } = req.body
    const update = {
      name,
      email,
      password,
      role,
      creditcard
    }
    Object.keys(update).forEach(key => {
      if (!update[key]) delete update[key]
    })
    try {
      const user = await User.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true })
      if (!user) {
        errorMessage.error = `User with ID: ${req.params.id} was not found`
        return res.status(404).json(errorMessage)
      }
      res.set('Location', `/api/users/${user._id}`)
      return res.status(200).json(user)
    } catch (err) {
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) {
        errorMessage.error = `User with ID: ${req.params.id} was not found`
        return res.status(404).json(errorMessage)
      }
      // delete all items that the user owned
      await Item.deleteMany({ owner: user._id })
      // if the deleted user owned a credit card, delete that also
      if (user.creditcard) {
        await CreditCard.findOneAndDelete({ owner: user._id })
      }
      console.log('User deleted')
      return res.status(200).json({ status: 'success', deleted: user })
    } catch (err) {
      console.error(err)
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  }

}