const { buildSchema } = require("graphql");


// --------------------- Types -------------------------------
const userTypeSchema = require("./Schema_belongings/types/user_type_schema");
const userRoleTypeSchema = require("./Schema_belongings/types/userRole_type_schema");
const categoryTypeSchema = require("./Schema_belongings/types/category_type_schema");
const categoriesTypeSchema = require('./Schema_belongings/types/categories_type_schema');
const photoTypeSchema = require('./Schema_belongings/types/photo_type_schema');
const productTypeSchema = require('./Schema_belongings/types/product_type_schema');
const productsTypeSchema = require('./Schema_belongings/types/products_type_schema');
const itemInStockTypeSchema = require('./Schema_belongings/types/stock_type_ItemInStock_schema');
const stockTypeSchema = require('./Schema_belongings/types/stock_type_schema');
const stocksTypeSchema = require('./Schema_belongings/types/stocks_type_schema');
const customerTypeSchema = require('./Schema_belongings/types/customer_type_schema');
const customersTypeSchema = require('./Schema_belongings/types/customers_type_schema');
const customerFavoritesTypeSchema = require('./Schema_belongings/types/customerFavorites_type.schema');
const customerFavoriteTypeSchema = require('./Schema_belongings/types/customerFavorite_type_schema');
const orderTypeSchema = require('./Schema_belongings/types/order_type_schema');
const orderProductsTypeSchema = require('./Schema_belongings/types/orderProducts_type_schema');
const ordersTypeSchema = require('./Schema_belongings/types/orders_type_schema');


// --------------------- Inputs ------------------------------
const userInputData = require("./Schema_belongings/inputs/user_data_input");
const userInputCredintial = require("./Schema_belongings/inputs/user_credintial_input");
const categoryInputData = require('./Schema_belongings/inputs/category_data_input');
const photoInputData = require('./Schema_belongings/inputs/photo_data_input');
const productInputData = require('./Schema_belongings/inputs/product_data_input');
const stockItemInputData = require('./Schema_belongings/inputs/stockItem_data_input');
const stockInputData = require('./Schema_belongings/inputs/stock_data_input');
const customerInputData = require('./Schema_belongings/inputs/customer_data_input');
const customerFavoriteCategoryInputData = require('./Schema_belongings/inputs/customerFavoriteCategory_data_input');
const customerFavoriteInputData = require('./Schema_belongings/inputs/customerFavorite_data_input');
const orderProdutsInputData = require('./Schema_belongings/inputs/orderProducts_data_input');
const orderInputData = require('./Schema_belongings/inputs/order_data_input');


// -------------------- RootQuery ----------------------------
const rootQuery = require("./Schema_belongings/root_query/root_query");


// -------------------- RootMutation -------------------------
const rootMutation = require("./Schema_belongings/root_mutation/root_mutation");


// -------------------- Schema -------------------------------
const schema = require("./Schema_belongings/schema/schema");




module.exports = buildSchema(`

    ${userTypeSchema}
    ${userRoleTypeSchema}
    ${categoryTypeSchema}
    ${categoriesTypeSchema}
    ${photoTypeSchema}
    ${productTypeSchema}
    ${productsTypeSchema}
    ${itemInStockTypeSchema}
    ${stockTypeSchema}
    ${stocksTypeSchema}
    ${customerTypeSchema}
    ${customersTypeSchema}
    ${customerFavoriteTypeSchema}
    ${customerFavoritesTypeSchema}
    ${customerFavoriteCategoryInputData}
    ${orderProductsTypeSchema}
    ${orderTypeSchema}
    ${ordersTypeSchema}

    ${userInputData}
    ${userInputCredintial} 
    ${categoryInputData}
    ${photoInputData}
    ${productInputData}
    ${stockItemInputData}
    ${stockInputData}
    ${customerInputData}
    ${customerFavoriteInputData}
    ${orderProdutsInputData}
    ${orderInputData}

    ${rootQuery}

    ${rootMutation}

    ${schema}
`);
