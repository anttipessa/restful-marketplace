const User = require('../models/user');
const path = 'localhost:3000/'

const errorMessage = { 'status': 'error' }

module.exports = {

  async createUser(req, res) {
    const { name, password, email, creditcard } = req.body
    if (name && password && email) {
      console.log('Adding user', name)
      const newUser = new User({
        name,
        email,
        password,
        creditcard
      })
      try {
        await newUser.save()
        return res.status(201).json(newUser)
      } catch (err) {
        errorMessage.errors = err.errors
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
        errorMessage.error = `User with ID: ${req.params.id} was not found`
        return res.status(404).json(errorMessage)
      }
      res.set('Location', `${path}api/items/${user._id}`)
      return res.status(200).json(user)
    } catch (err) {
      errorMessage.errors = err.errors
      return res.status(500).json(errorMessage)
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      if (!user) {
        errorMessage.error = `User with ID: ${req.params.id} was not found`
        return res.status(404).json(errorMessage)
      }
      res.set('Location', `${path}api/users/${user._id}`)
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
      console.log('User deleted')
      return res.status(200).json({ status: 'success', deleted: user })
    } catch (err) {
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  }

}