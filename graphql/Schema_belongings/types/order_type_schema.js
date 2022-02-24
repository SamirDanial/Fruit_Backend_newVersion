module.exports = `
    type Order {
        _id: ID
        address: String
        geoLocation: String
        orderCode: String
        approved: String
        isCanceled: Boolean
        customerId: Customer
        products: [orderProduct]
        totalQuantity: Int
        totalPrice: Int
        pvNote: String
        orderDate: String
    }
`;