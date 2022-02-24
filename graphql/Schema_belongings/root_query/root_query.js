module.exports = `
type RootQuery {
    loginUser(credintialInput: Credintial): User
    getCategories: Categories
    getCategory(ID: String!): Category
    getProducts( PageSize: Int, PageNumber: Int): Products
    getFeaturedProducts( PageSize: Int, PageNumber: Int): Products
    getProduct(ID: String!): Product
    getProductByCategory(ID: String!): Products
    autoFillNameProduct(Name: String!): [String!]
    filterByNameProduct(Name: String!): Products
    getStocks(PageSize: Int, PageNumber: Int): Stocks
    getStock(ID: String!, ItemsPerPageSize: Int, ItemsPageNumber: Int): Stock
    getCustomers(PageNumber: Int!, PageSize: Int!): Customers
    getCustomer(ID: String!): Customer
    getCustomerProfile: Customer
    searchCustomer(customerInputData: CustomerInputData): [Customer]
    getOrder(ID: String): Order
    getOrders(PageNumber: Int, PageSize: Int): Orders
    searchOrder(orderCode: String, fromDate: String, toDate: String, PageNumber: Int, PageSize: Int): Orders
    getOrderForCustomer(ID: String, customerID: String): Order
    getOrdersForCustomer(customerID: String, PageNumber: Int, PageSize: Int): Orders
    searchOrderForCustomer(customerID: String, orderCode: String, fromDate: String, toDate: String, PageNumber: Int, PageSize: Int): Orders
    getFavorites(customerId: String): CustomerFavorite
    getFavorite(customerId: String, productId: String): CustomerFavorite
}
`
;
