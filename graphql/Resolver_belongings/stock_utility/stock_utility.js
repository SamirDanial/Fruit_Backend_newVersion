const stock = require("../../../models/stock");
const Stock = require("../../../models/stock");
const checkAdmin = require("../utility/check_admin");

module.exports = {
  getStocks: async function ({ PageSize, PageNumber }, req) {
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

    const stocks = await Stock.find()
      .skip((PageNumber - 1) * PageSize)
      .limit(PageSize)
      .sort({ name: 1 })
      .select(["_id", "name", "description"]);

    return stocks != null ? {
      stocks: stocks.map((stock) => {
        return {
          ...stock._doc,
          _id: stock._id.toString(),
        };
      }),
    }: "Not found any stock";
  },

  getStock: async function ({ ID, ItemsPerPageSize, ItemsPageNumber }, req) {
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
    const stock = await Stock.findById(ID).populate("itemInStock.product");
    if (stock !== null) {
      const itemsToReturn = stock.itemInStock;
      const itemsToShow = [];
      if (ItemsPageNumber == 1) {
        for (let index = 0; index < ItemsPerPageSize; index++) {
          itemsToShow.push(itemsToReturn[index]);
        }
      } else {
        for (
          let index = ItemsPerPageSize * ItemsPageNumber - ItemsPerPageSize;
          index < ItemsPerPageSize * ItemsPageNumber;
          index++
        ) {
          itemsToShow.push(itemsToReturn[index]);
        }
      }
      if (itemsToShow[0] != undefined) {
        stock.itemInStock = itemsToShow;
      }
    }

    return stock != null
      ? {
          ...stock._doc,
          _id: stock._id.toString(),
        }
      : "Not found";
  },

  createStock: async function ({ stockInputData }, req) {
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

    const stock = new Stock({
      name: stockInputData.name,
      description: stockInputData.description,
      itemInStock: [],
    });

    const savedStock = await stock.save();

    return {
      ...savedStock._doc,
      _id: savedStock._id.toString(),
    };
  },

  editStock: async function ({ stockInputData }, req) {
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

    const stock = await Stock.findOneAndUpdate(
      { _id: stockInputData.ID },
      { name: stockInputData.name, description: stockInputData.description },
      { new: true }
    );

    return {
      ...stock._doc,
      _id: stock._id.toString(),
    };
  },
  deleteStock: async function ({ ID }, req) {
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

    await Stock.deleteOne({ _id: ID });

    return "deleted successfuly";
  },

  addProductToStock: async function ({ ID, availableNumber, productID }, req) {
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
    let alreadyAvailable = false;
    const stock = await Stock.findById(ID).populate("itemInStock.product");

    stock.itemInStock.forEach((item) => {
      if (item.product._id.toString() == productID) {
        alreadyAvailable = true;
      }
      if (alreadyAvailable) return;
    });

    if (!alreadyAvailable) {
      stock.itemInStock.push({
        product: productID,
        availableNumber: availableNumber,
      });
    } else {
      const item = await stock.itemInStock.filter(
        (x) => x.product._id.toString() == productID
      )[0];
      item.availableNumber = item.availableNumber + availableNumber;
    }
    await stock.save();
    const returnedStock = await Stock.findById(ID).populate(
      "itemInStock.product"
    );

    return {
      ...returnedStock._doc,
      _id: returnedStock._id.toString(),
    };
  },

  removeProductFromStock: async function (
    { ID, numberToRemove, productID },
    req
  ) {
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

    const stock = await Stock.findById(ID).populate("itemInStock.product");
    const item = await stock.itemInStock.filter(
      (x) => x.product._id.toString() == productID
    )[0];

    if (item && item.availableNumber >= numberToRemove) {
      item.availableNumber -= numberToRemove;
    } else {
      const error = new Error("Not enough item");
      error.code = 400;
      throw error;
    }
    await stock.save();
    return {
      ...stock._doc,
      _id: stock._id.toString(),
    };
  },
};
