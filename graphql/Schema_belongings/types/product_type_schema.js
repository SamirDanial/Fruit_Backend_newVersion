module.exports = `
    type Product {
        _id: ID
        name: String
        description: String
        unitDescription: String
        marketPrice: Int
        price: Float
        featured: Boolean
        visible: Boolean
        categories: [Category]
        photos: [Photo!]
    }
`
;