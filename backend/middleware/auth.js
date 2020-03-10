const jwt = require('jsonwebtoken')
const errorMessage = { 'status': 'error' }

module.exports = {
  ensureAuthenticated(req, res, next) {
    console.log('ensure authenticated')
    next()
  },

  ensureAdmin(req, res, next) {
    console.log('ensure admin')
    next()
  },

  ensureShopkeeper(req, res, next) {
    console.log('ensure shopkeeper')
    next()
  },

  ensureNotSelf(req, res, next) {
    console.log('ensure not self')
    next()
  }
}