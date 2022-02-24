const Category = require("../../../models/category");
const checkAdmin = require("../utility/check_admin");

module.exports = {
  getCategory: async function ({ ID }, req) {
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

    const category = await Category.findById(ID);

    return category != null ? {
      ...category._doc,
      _id: category._id.toString(),
    }: "Not found any category";
  },

  getCategories: async function (args, req) {
    // if (req.user) {
    //   await checkAdmin(req).then((result) => {
    //     if (!result) {
    //       const error = new Error("Not authorised");
    //       error.code = 401;
    //       throw error;
    //     }
    //   });
    // } else {
    //   const error = new Error("Not authorised");
    //   error.code = 401;
    //   throw error;
    // }

    const categories = await Category.find().sort({ name: -1 });
    return categories != null ? {
      categories: categories.map((category) => {
        return {
          ...category._doc,
          _id: category._id.toString(),
        };
      }),
    }: "Not found any category";
  },
  createCategory: async function ({ categoryInput }, req) {
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

    const category = new Category({
      name: categoryInput.name,
      imageUrl: categoryInput.imageUrl,
      description: categoryInput.description,
    });

    const savedCategory = await category.save();

    return {
      ...savedCategory._doc,
      _id: savedCategory._id.toString(),
    };
  },
  editCategory: async function ({ categoryInput }, req) {
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

    const preCategory = await Category.findById(categoryInput.ID);

    const category = await Category.findOneAndUpdate(
      { _id: categoryInput.ID },
      { name: categoryInput.name, description: categoryInput.description, imageUrl: categoryInput.imageUrl !== "" ? categoryInput.imageUrl : preCategory.imageUrl },
      { new: true }
    );

    return {
      ...category._doc,
      _id: category._id.toString(),
    };
  },

  deleteCategory: async function({ID}, req) {
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

    await Category.deleteOne({_id: ID});

    return "deleted successfully";
  }
};
