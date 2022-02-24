module.exports = `
type RootMutation {
    createUser(userInput: UserInputData!): User
    createCategory(categoryInput: CategoryInputData): Category
    editCategory(categoryInput: CategoryInputData) : Category
    deleteCategory(ID: String!): String
    createProduct(productInput: ProductInputData): Product
    editProduct(productInput: ProductInputData): Product
    deleteProduct(ID: String): String
    addImageToProduct(ID: String!, photoInput: PhotoInputData): Photo
    deleteImageFromProduct(ID: String!, PhotoID: String): Product
    setFeatureProduct(ID: String!, PhotoID: String): Product
    createStock(stockInputData: StockInputData): Stock
    editStock(stockInputData: StockInputData): Stock
    deleteStock(ID: String!): String
    addProductToStock(ID: String!, availableNumber: Int!, productID: String!): Stock
    removeProductFromStock(ID: String!, numberToRemove: Int!, productID: String!): Stock
    createCustomer(customerInputData: CustomerInputData!): Customer
    editCustomer(customerInputData: CustomerInputData!): Customer
    deleteCustomer(ID: String!, userId: String!): String
    createOrder(orderInputData: OrderInputData): Order
    editOrder(orderInputData: OrderInputData): Order
    approveOrder(ID: String, statusText: String):Order
    toggleCancelOrder(ID: String): Order
    addToFavorites(customerFavoriteInputData: CustomerFavoriteInputData): CustomerFavorite
    removeFromFavorites(customerFavoriteInputData: CustomerFavoriteInputData): CustomerFavorite
}
`;
