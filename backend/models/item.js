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
    user: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }
});

itemSchema.virtual('links').get(function () {
    return [{ 'self': 'http://localhost:3000/api/items/' + this._id }];
});

itemSchema.set('toJSON', { virtuals: true })

const Item = new mongoose.model('Item', itemSchema);
module.exports = Item;
