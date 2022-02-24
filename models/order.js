const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    address: String,
    geoLocation: String,
    orderCode: String,
    isCanceled: {
        type: Boolean,
        default: false
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            eachPrice: Number,
            totalPriceForThis: Number,
            quantity: Number,
        }
    ],
    totalQuantity: Number,
    totalPrice: Number,
    approved: String,
    pvNote: String,
    orderDate: {
        type: Date,
        default: new Date(),
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);