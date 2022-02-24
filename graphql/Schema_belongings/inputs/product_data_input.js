module.exports = `
    input ProductInputData {
        ID: String
        name: String!
        description: String!
        unitDescription: String!
        marketPrice: Int!
        price: Int!
        visible: Boolean!
        featured: Boolean
        categoriesID: [String!]!
        photos: [PhotoInputData]
    }
`
;