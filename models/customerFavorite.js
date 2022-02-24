const mongoose = require('mongoose');

const CustomerFavoriteSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
    },
    favoriteProducts: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            }
        }
    ]
});

module.exports = CustomerFavorite = mongoose.model('customerFavorite', CustomerFavoriteSchema);