module.exports = `
    type CustomerFavorite {
        _id: ID
        customerId: Customer
        favoriteProducts: [Product]
    }
`;