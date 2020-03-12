require('dotenv').config()
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/user')

const errorMessage = { 'status': 'error', 'error': 'Authentication failed' }
const SECRET = config.get('session').secret

module.exports = {
  verifyAuth(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      const token = req.headers.authorization.slice(7, req.headers.authorization.length)
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json(errorMessage)
        else {
          req.user = {
            name: decoded.name
          }
          next()
        }
      })
    } else {
      return res.status(401).json(errorMessage)
    }
  },

  async ensureAdmin(req, res, next) {
    try {
      const user = await User.findOne({ name: req.user.name })
      if (user.role === 'admin') {
        next()
      } else {
        errorMessage.error = 'Admin rights required'
        return res.status(401).json(errorMessage)
      }
    } catch (err) {
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  },

  async ensureShopkeeper(req, res, next) {
    try {
      const user = await User.findOne({ name: req.user.name })
      if (user.role === 'admin' || user.role === 'shopkeeper') {
        next()
      } else {
        errorMessage.error = 'Admin rights required'
        return res.status(401).json(errorMessage)
      }
    } catch (err) {
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  },

  async ensureSelf(req, res, next) {
    try {
      const user = await User.findOne({ name: req.user.name })
      if (user.role === 'admin' || user._id == req.params.id) {
        next()
      } else return res.status(401).json(errorMessage)
    } catch (err) {
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  },

  async ensureNotSelf(req, res, next) {
    try {
      const user = await User.findOne({ name: req.user.name })
      if (user._id != req.params.id) {
        next()
      } else {
        errorMessage.error = 'This action can\'t be performed on self'
        return res.status(400).json(errorMessage)
      }
    } catch (err) {
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  },

}