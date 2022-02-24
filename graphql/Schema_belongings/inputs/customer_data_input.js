module.exports = `
    input CustomerInputData {
        ID: String,
        name: String!,
        lastName: String!,
        active: Boolean,
        photoUrl: String,
        physicalAddress: String!,
        phoneNumber: String,
        emailAddress: String,
        coordinates: String,
        favoriteCategories: [CustomerFavoriteCategoryInputData],
        userId: String
    }
`
;