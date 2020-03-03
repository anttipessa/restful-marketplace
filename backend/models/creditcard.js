const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditCardSchema = new Schema({
    number: {
        type: String,
        required: true,
    },
    balance: {
        type: Number
    }
});

creditCardSchema.virtual('links').get(function () {
    return [{ 'self': 'http://localhost:3000/api/payments/' + this._id }];
});

creditCardSchema.set('toJSON', { virtuals: true })

const CreditCard = new mongoose.model('CreditCard', creditCardSchema);
module.exports = CreditCard;