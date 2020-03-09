const CreditCard = require('../models/creditcard');
const path = 'localhost:3000/'

const errorMessage = { 'status': 'error' }

module.exports = {

  async createCard(req, res) {
    const { number, balance, owner} = req.body
    if (number) {
      console.log('Adding card', number);
      const newCard = new CreditCard({
        number,
        balance,
        owner
      })
      try {
        newCard.save()
        console.log('Inserted 1 document into the collection')
        return res.status(201).json(newCard)
      } catch (err) {
        errorMessage.error = err.message
        return res.status(500).json(errorMessage)
      }
    } else {
      errorMessage.error = 'The following fields are required: number'
      return res.status(400).json(errorMessage)
    }
  },

  async listCards(req, res) {
    const cards = await CreditCard.find({})
        .sort('_id')
        .populate('owner')
    return res.status(200).json(cards)
  },

  async showCard(req, res) {
    try {
      const card = await CreditCard.findOne({ _id: req.params.id })
          .populate('owner')
      if (!card) {
        errorMessage.error = `CreditCard with ID: ${req.params.id} was not found`
        return res.status(404).json(errorMessage)
      }
      res.set('Location', `${path}api/payments/${card._id}`)
      return res.status(200).json(card)
    } catch (err) {
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  },

  async updateCard(req, res) {
    try {
      const card = await CreditCard.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
          .populate('owner')
      if (!card) {
        errorMessage.error = `CreditCard with ID: ${req.params.id} was not found`
        return res.status(404).json(errorMessage)
      }
      res.set('Location', `${path}api/payments/${card._id}`)
      console.log('Card updated')
      return res.status(200).json(card)
    } catch (err) {
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  },

  async deleteCard(req, res) {
    try {
      const card = await CreditCard.findByIdAndDelete(req.params.id)
      if (!card) {
        errorMessage.error = `CreditCard with ID: ${req.params.id} was not found`
        return res.status(404).json(errorMessage)
      }
      return res.status(200).json({ status: 'success', deleted: card })
    } catch (err) {
      errorMessage.error = err.message
      return res.status(500).json(errorMessage)
    }
  }

}