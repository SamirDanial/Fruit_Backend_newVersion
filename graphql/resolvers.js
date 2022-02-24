const {
  loginUser,
  createUser,
} = require("./Resolver_belongings/user_utility/user_utility");
const {
  createCategory,
  editCategory,
  getCategory,
  getCategories,
  deleteCategory,
} = require("./Resolver_belongings/category_utility/category_utility");
const {
  createProduct,
  getProducts,
  getProduct,
  getProductByCategory,
  editProduct,
  deleteProduct,
  addImageToProduct,
  deleteImageFromProduct,
  setFeatureProduct,
  autoFillNameProduct,
  filterByNameProduct,
  getFeaturedProducts,
} = require("./Resolver_belongings/product_utility/product_utility");

const {
  createStock,
  editStock,
  deleteStock,
  getStocks,
  addProductToStock,
  removeProductFromStock,
  getStock,
} = require("./Resolver_belongings/stock_utility/stock_utility");

const {
  createCustomer,
  editCustomer,
  deleteCustomer,
  getCustomers,
  getCustomer,
  getCustomerProfile
} = require("./Resolver_belongings/customer_utility/customer_utility");

const {
  createOrder,
  editOrder,
  toggleCancelOrder,
  getOrders,
  getOrder,
  searchOrder,
  getOrderForCustomer,
  getOrdersForCustomer,
  searchOrderForCustomer,
  approveOrder,
} = require("./Resolver_belongings/order_utility/order_utility");

const {
  addToFavorites,
  removeFromFavorites,
  getFavorite,
  getFavorites,
} = require("./Resolver_belongings/customerFavorite_utility/customerFavorite_utility");

module.exports = {
  // -------------------------- user_utility---------------------------
  loginUser: (props, req) => loginUser(props, req),
  createUser: (props, req) => createUser(props, req),

  // -------------------------- Category_utility ----------------------
  createCategory: (props, req) => createCategory(props, req),
  getCategory: (props, req) => getCategory(props, req),
  getCategories: (props, req) => getCategories(props, req),
  editCategory: (props, req) => editCategory(props, req),
  deleteCategory: (props, req) => deleteCategory(props, req),

  // -------------------------- Product_utility -----------------------
  createProduct: (props, req) => createProduct(props, req),
  getProducts: (props, req) => getProducts(props, req),
  getProduct: (props, req) => getProduct(props, req),
  editProduct: (props, req) => editProduct(props, req),
  deleteProduct: (props, req) => deleteProduct(props, req),
  addImageToProduct: (props, req) => addImageToProduct(props, req),
  deleteImageFromProduct: (props, req) => deleteImageFromProduct(props, req),
  setFeatureProduct: (props, req) => setFeatureProduct(props, req),
  autoFillNameProduct: (props, req) => autoFillNameProduct(props, req),
  filterByNameProduct: (props, req) => filterByNameProduct(props, req),
  getFeaturedProducts: (props, req) => getFeaturedProducts(props, req),

  // ------------------------- Stock_utility --------------------------
  createStock: (props, req) => createStock(props, req),
  editStock: (props, req) => editStock(props, req),
  deleteStock: (props, req) => deleteStock(props, req),
  getStock: (props, req) => getStock(props, req),
  getStocks: (props, req) => getStocks(props, req),
  addProductToStock: (props, req) => addProductToStock(props, req),
  removeProductFromStock: (props, req) => removeProductFromStock(props, req),

  // ------------------------- Customer_utility -----------------------
  createCustomer: (props, req) => createCustomer(props, req),
  editCustomer: (props, req) => editCustomer(props, req),
  deleteCustomer: (props, req) => deleteCustomer(props, req),
  getCustomers: (props, req) => getCustomers(props, req),
  getCustomer: (props, req) => getCustomer(props, req),
  getCustomerProfile: (props, req) => getCustomerProfile(props, req),

  // -------------------------- Order_utility --------------------------
  createOrder: (props, req) => createOrder(props, req),
  editOrder: (props, req) => editOrder(props, req),
  toggleCancelOrder: (props, req) => toggleCancelOrder(props, req),
  getOrders: (props, req) => getOrders(props, req),
  getOrder: (props, req) => getOrder(props, req),
  searchOrder: (props, req) => searchOrder(props, req),
  getOrderForCustomer: (props, req) => getOrderForCustomer(props, req),
  getOrdersForCustomer: (props, req) => getOrdersForCustomer(props, req),
  searchOrderForCustomer: (props, req) => searchOrderForCustomer(props, req),
  approveOrder: (props,req) => approveOrder(props, req),

  // --------------------- CustomerFavorite_utility ---------------------
  addToFavorites: (props, req) => addToFavorites(props, req),
  removeFromFavorites: (props, req) => removeFromFavorites(props, req),
  getFavorite: (props, req) => getFavorite(props, req),
  getFavorites: (props, req) => getFavorites(props, req),
  getProductByCategory: (props, req) => getProductByCategory(props, req)
};
