module.exports = `
    type Stock {
        _id: ID
        name: String
        description: String
        itemInStock: [ItemInStock!]
    }
`;