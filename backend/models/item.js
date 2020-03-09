const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onsale: {
        type: Boolean,
        default: true
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

itemSchema.virtual('links').get(function () {
    return [{ 'self': 'http://localhost:3000/api/items/' + this._id }];
});

itemSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret.owner.role
        delete ret.owner.offers
        delete ret.owner.creditcard
        delete ret.owner.__v
        delete ret.owner.isAdmin
        delete ret.owner.isShopkeeper
        delete ret.owner.isRegistered
        delete ret.owner.links
        delete ret.owner.id
    }
})

const Item = new mongoose.model('Item', itemSchema);
module.exports = Item;
