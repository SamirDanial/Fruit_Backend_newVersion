const CustomerFavorite = require("../../../models/customerFavorite");
const authenticated = require("../utility/check_authenticate");

module.exports = {
  addToFavorites: async ({ customerId, productId }, req) => {
    if (req.user) {
      await authenticated(req).then((result) => {
        if (!result) {
          const error = new Error("Not authorised");
          error.code = 401;
          throw error;
        }
      });
    } else {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    const customerFavorite = new CustomerFavorite({
        customerId: customerId,
        favoriteProducts: [{ product: productId }],
      });

    await customerFavorite.save();

    await customerFavorite.populate('customerId');

    for(let i = 0; i < customerFavorite.favoriteProducts.length; i++) {
        await customerFavorite.populate(`favoriteProducts.${i}.product`);
    }
    console.log("%j", customerFavorite);
    // console.log(customerFavorite.favoriteProducts[0].product.name);

    return {
        ...customerFavorite._doc,
        favoriteProducts: customerFavorite.favoriteProducts.map((product, index) => {
          return {
            ...product._doc,
            _id: product._id.toString()
          }
        }),
        _id: customerFavorite._id.toString()
    }
  },
  removeFromFavorites: async ({ customerId, productId }, req) => {},
  getFavorites: async ({ customerId }, req) => {
    if (req.user) {
      await authenticated(req).then((result) => {
        if (!result) {
          const error = new Error("Not authorised");
          error.code = 401;
          throw error;
        }
      });
    } else {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    const favoriteProducts = await CustomerFavorite.findOne({customerId: customerId}).populate('customerId');

    for (let i = 0; i < favoriteProducts.favoriteProducts.length; i++) {
      await favoriteProducts.populate(`favoriteProducts.${i}.product`);
    }
    
    return favoriteProducts.favoriteProducts[0].product.name && {
      ...favoriteProducts._doc,
       favoriteProducts: favoriteProducts._doc.favoriteProducts.map((p, index) => {
        return {
          ...p.product._doc
        }
      }),
      _id: favoriteProducts._id.toString(),
    }
    
  },
  getFavorite: async ({ customerId, productId }, req) => {},
};
