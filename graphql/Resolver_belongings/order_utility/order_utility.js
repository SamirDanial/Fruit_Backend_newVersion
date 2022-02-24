const Order = require("../../../models/order");
const authenticated = require("../utility/check_authenticate");
const checkAdmin = require("../utility/check_admin");
const Customer = require("../../../models/customer");

function getRandomString(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return Date.now().toString() + result;
}

module.exports = {
  approveOrder: async ({ID, statusText}, req) => {
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

    const order = await Order.findById(ID);
    order.approved = statusText;

    let savedOrder = await order.save();

    savedOrder = await savedOrder.populate("customerId");

    for (let i = 0; i < savedOrder.products.length; i++) {
      await savedOrder.populate(`products.${i}.productId`);
    }

    return {
      ...savedOrder._doc,
      _id: savedOrder._id.toString(),
    };
  },
  searchOrder: async (
    { orderCode, fromDate, toDate, PageNumber, PageSize },
    req
  ) => {
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

    let orders;
    if (orderCode != undefined && orderCode.toString().length > 0) {
      orders = await Order.find({
        orderCode: { $regex: orderCode, $options: "i" },
      }).populate("customerId");
    }

    if (fromDate != undefined || toDate != undefined) {
      if (fromDate != undefined && toDate != undefined) {
        orders = await Order.find({
          orderDate: { $gte: fromDate, $lt: toDate },
        })
          .populate("customerId")
          .skip((PageNumber - 1) * PageSize)
          .limit(PageSize)
          .sort({ name: 1 })
          .populate("customerId");
      } else if (toDate == undefined) {
        orders = await Order.find({
          orderDate: { $gte: fromDate },
        })
          .populate("customerId")
          .skip((PageNumber - 1) * PageSize)
          .limit(PageSize)
          .sort({ name: 1 })
          .populate("customerId");
      } else if (fromDate == undefined) {
        orders = await Order.find({
          orderDate: { $lt: toDate },
        })
          .populate("customerId")
          .skip((PageNumber - 1) * PageSize)
          .limit(PageSize)
          .sort({ name: 1 })
          .populate("customerId");
      }
    }

    if (orders != undefined) {
      for (let j = 0; j < orders.length; j++) {
        let order = orders[j];
        for (let i = 0; i < order.products.length; i++) {
          await order.populate(`products.${i}.productId`);
        }
      }
    }

    return {
      orders:
        orders != undefined
          ? orders.map((order, index) => {
              return {
                ...order._doc,
                _id: order._id.toString(),
              };
            })
          : [],
    };
  },
  getOrder: async ({ ID }, req) => {
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

    const order = await Order.findById(ID).populate("customerId");

    for (let i = 0; i < order.products.length; i++) {
      await order.populate(`products.${i}.productId`);
    }

    return {
      ...order._doc,
      _id: order._id.toString(),
    };
  },
  getOrders: async ({ PageNumber, PageSize }, req) => {
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

    const OrdersCount = await Order.count();
    const orders = await Order.find()
      .skip((PageNumber - 1) * PageSize)
      .limit(PageSize)
      .sort({ orderDate: -1 })
      .populate("customerId");

    for (let j = 0; j < orders.length; j++) {
      let order = orders[j];
      for (let i = 0; i < order.products.length; i++) {
        await order.populate(`products.${i}.productId`);
      }
    }

    return {
      orders: orders.map((order, index) => {
        return {
          ...order._doc,
          _id: order._id.toString(),
        };
      }),
      allOrderCount: OrdersCount,
    };
  },

  searchOrderForCustomer: async (
    { customerID, orderCode, fromDate, toDate, PageNumber, PageSize },
    req
  ) => {
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

    let orders;
    if (orderCode != undefined && orderCode.toString().length > 0) {
      orders = await Order.find({
        customerId: customerID,
        orderCode: { $regex: orderCode, $options: "i" },
      }).populate("customerId");
    }

    if (fromDate != undefined || toDate != undefined) {
      if (fromDate != undefined && toDate != undefined) {
        orders = await Order.find({
          customerId: customerID,
          orderDate: { $gte: fromDate, $lt: toDate },
        })
          .populate("customerId")
          .skip((PageNumber - 1) * PageSize)
          .limit(PageSize)
          .sort({ name: 1 })
          .populate("customerId");
      } else if (toDate == undefined) {
        orders = await Order.find({
          customerId: customerID,
          orderDate: { $gte: fromDate },
        })
          .populate("customerId")
          .skip((PageNumber - 1) * PageSize)
          .limit(PageSize)
          .sort({ name: 1 })
          .populate("customerId");
      } else if (fromDate == undefined) {
        orders = await Order.find({
          customerId: customerID,
          orderDate: { $lt: toDate },
        })
          .populate("customerId")
          .skip((PageNumber - 1) * PageSize)
          .limit(PageSize)
          .sort({ name: 1 })
          .populate("customerId");
      }
    }

    if (orders != undefined) {
      for (let j = 0; j < orders.length; j++) {
        let order = orders[j];
        for (let i = 0; i < order.products.length; i++) {
          await order.populate(`products.${i}.productId`);
        }
      }
    }

    return {
      orders:
        orders != undefined
          ? orders.map((order, index) => {
              return {
                ...order._doc,
                _id: order._id.toString(),
              };
            })
          : [],
    };
  },
  getOrderForCustomer: async ({ ID, customerID }, req) => {
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

    const order = await Order.findById(ID).populate("customerId");

    for (let i = 0; i < order.products.length; i++) {
      await order.populate(`products.${i}.productId`);
    }

    return {
      ...order._doc,
      _id: order._id.toString(),
    };
  },
  getOrdersForCustomer: async ({ customerID, PageNumber, PageSize }, req) => {
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

    const orders = await Order.find({ customerId: customerID })
      .skip((PageNumber - 1) * PageSize)
      .limit(PageSize)
      .sort({ name: 1 })
      .populate("customerId");

    for (let j = 0; j < orders.length; j++) {
      let order = orders[j];
      for (let i = 0; i < order.products.length; i++) {
        await order.populate(`products.${i}.productId`);
      }
    }

    return {
      orders: orders.map((order, index) => {
        return {
          ...order._doc,
          _id: order._id.toString(),
        };
      }),
    };
  },
  createOrder: async ({ orderInputData }, req) => {
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

    const order = new Order({
      address: orderInputData.address,
      geoLocation: orderInputData.geoLocation,
      orderCode: getRandomString(5),
      approved:'N/A',
      products: orderInputData.products,
      customerId: orderInputData.customerId,
      totalQuantity: orderInputData.totalQuantity,
      pvNote: orderInputData.pvNote,
      totalPrice: orderInputData.totalPrice,
    });

    const customer = await Customer.findById(
      orderInputData.customerId
    ).populate("userId");

    if (req.user.id != customer.userId._id.toString()) {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    let savedOrder = await order.save();

    savedOrder = await savedOrder.populate("customerId");

    for (let i = 0; i < savedOrder.products.length; i++) {
      await savedOrder.populate(`products.${i}.productId`);
    }

    return {
      ...savedOrder._doc,
      _id: savedOrder._id.toString(),
    };
  },

  editOrder: async ({ orderInputData }, req) => {
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

    const order = await Order.findById(orderInputData.ID);
    order.address = orderInputData.address;
    order.geoLocation = orderInputData.geoLocation;
    order.products = orderInputData.products;
    order.totalQuantity = orderInputData.totalQuantity;
    order.totalPrice = orderInputData.totalPrice;
    order.pvNote = orderInputData.pvNote;
    order.isCanceled = orderInputData.isCanceled;

    let savedOrder = await order.save();

    savedOrder = await savedOrder.populate("customerId");

    for (let i = 0; i < savedOrder.products.length; i++) {
      await savedOrder.populate(`products.${i}.productId`);
    }

    return {
      ...savedOrder._doc,
      _id: savedOrder._id.toString(),
    };
  },

  toggleCancelOrder: async ({ ID }, req) => {
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

    const order = await Order.findById(ID);
    order.isCanceled = !order.isCanceled;

    let savedOrder = await order.save();

    savedOrder = await savedOrder.populate("customerId");

    for (let i = 0; i < savedOrder.products.length; i++) {
      await savedOrder.populate(`products.${i}.productId`);
    }

    return {
      ...savedOrder._doc,
      _id: savedOrder._id.toString(),
    };
  },
};
