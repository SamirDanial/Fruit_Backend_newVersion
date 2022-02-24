const Product = require("../../../models/product");
const Category = require('../../../models/category');
const checkAdmin = require("../utility/check_admin");
const product = require("../../../models/product");

module.exports = {
  getFeaturedProducts: async function({ PageSize, PageNumber }, req) {
    const productsCount = await product.find({featured: true, visible: true}).count();
    const products = await Product.find({featured: true, visible: true})
      .skip((PageNumber - 1) * PageSize)
      .limit(PageSize)
      .sort({ name: 1 }).populate('categories');
    const customisedProducts = [];

    products.forEach((product) => {
      let p = {};
      p._id = product._id.toString();
      p.name = product.name;
      p.description = product.description;
      p.unitDescription = product.unitDescription;
      p.marketPrice = product.marketPrice;
      p.price = product.price;
      p.visible = product.visible;
      p.featured = product.featured;
      p.categories = product.categories;
      p.photos = product.photos.filter((x) => x.featured == true);
      customisedProducts.push(p);
    });

    return products != null ? {
      products: customisedProducts.map((product, index) => {
        return {
          ...product,
        };
      }),
      allProductsCount: productsCount
    }: "Not found any product";
  },
  autoFillNameProduct: async function ({ Name }, req) {
    let names = [];
    const productNames = await Product.find({
      name: { $regex: Name, $options: "i" },
    });
    productNames.forEach((product) => {
      if (product.visible) names.push(product.name);
    });

    return names;
  },

  filterByNameProduct: async function ({ Name }, req) {
    const products = await Product.find({
      name: { $regex: Name, $options: "i" },
    })
    const customisedProducts = [];

    products.forEach((product) => {
      let p = {};
      p._id = product._id.toString();
      p.name = product.name;
      p.description = product.description;
      p.unitDescription = product.unitDescription;
      p.marketPrice = product.marketPrice;
      p.price = product.price;
      p.featured = product.featured;
      p.visible = product.visible;
      p.photos = product.photos.filter((x) => x.featured == true);
      customisedProducts.push(p);
    });

    return products != null ? {
      products: customisedProducts.map((product, index) => {
        return {
          ...product,
        };
      }),
    }: "Not found any product";
  },

  getProduct: async function ({ ID }, req) {
    const product = await Product.findById(ID).populate('categories');

    return product != null ? {
      ...product._doc,
      _id: product._id.toString(),
    }: "Not found any product";
  },

  getProducts: async function ({ PageSize, PageNumber }, req) {
    const productsCount = await product.count();
    const products = await Product.find()
      .skip((PageNumber - 1) * PageSize)
      .limit(PageSize)
      .sort({ name: 1 }).populate('categories');
    const customisedProducts = [];

    products.forEach((product) => {
      let p = {};
      p._id = product._id.toString();
      p.name = product.name;
      p.description = product.description;
      p.unitDescription = product.unitDescription;
      p.marketPrice = product.marketPrice;
      p.price = product.price;
      p.visible = product.visible;
      p.featured = product.featured;
      p.categories = product.categories;
      p.photos = product.photos.filter((x) => x.featured == true);
      customisedProducts.push(p);
    });

    return products != null ? {
      products: customisedProducts.map((product, index) => {
        return {
          ...product,
        };
      }),
      allProductsCount: productsCount
    }: "Not found any product";
  },

  getProductByCategory: async function({ID}, req) {
    const products = await Product.find().populate('categories');
    const categorisedProduct = products.filter(x => x.categories[0]._id.toString() === ID);
    const productsCount = categorisedProduct.length;
    const customisedProducts = [];

    categorisedProduct.forEach((product) => {
      let p = {};
      p._id = product._id.toString();
      p.name = product.name;
      p.description = product.description;
      p.unitDescription = product.unitDescription;
      p.marketPrice = product.marketPrice;
      p.price = product.price;
      p.visible = product.visible;
      p.featured = product.featured;
      p.categories = product.categories;
      p.photos = product.photos.filter((x) => x.featured == true);
      customisedProducts.push(p);
    });
    return products != null ? {
      products: customisedProducts.map((product, index) => {
        return {
          ...product
        }
      }),
      allProductsCount: productsCount
    } : "Not found any product";
  },

  createProduct: async function ({ productInput }, req) {
    console.log(productInput);
    if (req.user) {
      await checkAdmin(req).then((result) => {
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

    const product = new Product({
      name: productInput.name,
      description: productInput.description,
      unitDescription: productInput.unitDescription,
      marketPrice: productInput.marketPrice,
      price: productInput.price,
      visible: productInput.visible,
      featured: productInput.featured,
      categories: productInput.categoriesID,
      photos: productInput.photos,
    });

    const savedProduct = await product.save();
    const returnedProduct = await Product.findById(savedProduct._id.toString()).populate('categories');

    return {
      ...returnedProduct._doc,
      _id: returnedProduct._id.toString(),
    };
  },

  editProduct: async function ({ productInput }, req) {
    console.log(productInput);
    if (req.user) {
      await checkAdmin(req).then((result) => {
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

    const product = await Product.findOneAndUpdate(
      { _id: productInput.ID },
      {
        name: productInput.name,
        description: productInput.description,
        unitDescription: productInput.unitDescription,
        marketPrice: productInput.marketPrice,
        price: productInput.price,
        visible: productInput.visible,
        featured: productInput.featured,
        categories: productInput.categoriesID,
        photos: productInput.photos
      },
      { new: true }
    );

    const returnedProduct = await Product.findById(product._id.toString()).populate('categories');

    return {
      ...returnedProduct._doc,
      _id: returnedProduct._id.toString(),
    };
  },

  addImageToProduct: async function ({ ID, photoInput }, req) {
    if (req.user) {
      await checkAdmin(req).then((result) => {
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

    const product = await Product.findById(ID);
    product.photos.push({
      photoUrl: photoInput.photoUrl,
      featured: photoInput.featured,
    });

    const _photoId = product.photos.find(x => x.photoUrl === photoInput.photoUrl)._id.toString();

    await product.save();

    return {
      _id: _photoId,
      photoUrl: photoInput.photoUrl,
      featured: photoInput.featured,
    };
  },

  deleteImageFromProduct: async function ({ ID, PhotoID }, req) {
    if (req.user) {
      await checkAdmin(req).then((result) => {
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

    const product = await Product.findById(ID);
    product.photos = await product.photos.filter(
      (x) => x._id.toString() !== PhotoID
    );
    await product.save();

    return {
      ...product._doc,
      _id: product._id.toString(),
    };
  },

  setFeatureProduct: async function ({ ID, PhotoID }, req) {
    if (req.user) {
      await checkAdmin(req).then((result) => {
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

    const product = await Product.findById(ID);
    const currentFeatured = await product.photos.filter(
      (x) => x.featured == true
    )[0];
    currentFeatured.featured = false;
    const photo = await product.photos.filter(
      (x) => x._id.toString() == PhotoID
    )[0];
    photo.featured = true;
    await product.save();

    return {
      ...product._doc,
      _id: product._id.toString(),
    };
  },

  deleteProduct: async function ({ ID }, req) {
    if (req.user) {
      await checkAdmin(req).then((result) => {
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

    await Product.deleteOne({ _id: ID });

    return "deleted successfully";
  },
};
