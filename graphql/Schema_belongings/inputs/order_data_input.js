module.exports = `
    input OrderInputData {
        ID: String
        address: String
        geoLocation: String
        orderCode: String
        isCanceled: Boolean
        customerId: String
        products: [OrderProductInputData]
        totalQuantity: Int
        totalPrice: Int
        pvNote: String
        orderDate: String
    }
`;