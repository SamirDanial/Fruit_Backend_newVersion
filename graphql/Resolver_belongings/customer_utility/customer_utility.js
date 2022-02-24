const Customer = require("../../../models/customer");
const checkAdmin = require("../utility/check_admin");
const authenticated = require("../utility/check_authenticate");

module.exports = {
  getCustomerProfile: async (props, req) => {
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
    const customer = await Customer.findOne({ userId: req.user.id }).populate(
      "userId"
    );

    await customer.populate("userId.userRole");

    for (let i = 0; i < customer.favoriteCategories.length; i++) {
      await customer.populate(`favoriteCategories.${i}.categoryId`);
    }

    return customer
      ? {
          ...customer._doc,
          favoriteCategories: customer.favoriteCategories.map(favoriteCategory => {
            return {
              ...favoriteCategory.categoryId._doc
            }
          }),
          _id: customer._id.toString(),
        }
      : {};
  },
  getCustomer: async ({ ID }, req) => {
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
    const customer = await Customer.findById(ID).populate("userId");
    await customer.populate("userId.userRole");

    return {
      ...customer._doc,
      _id: customer._id.toString(),
    };
  },
  getCustomers: async ({ PageNumber, PageSize }, req) => {
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

    const customerCount = await Customer.count();
    const customers = await Customer.find()
      .skip((PageNumber - 1) * PageSize)
      .limit(PageSize)
      .sort({ name: 1 })
      .populate("userId");

    for (const customer of customers) {
      await customer.populate("userId.userRole");
    }

    return {
      customers: customers.map((customer, index) => {
        return {
          ...customer._doc,
          _id: customer._id.toString(),
        };
      }),
      allCustomerCount: customerCount,
    };
  },

  createCustomer: async ({ customerInputData }, req) => {
    const customer = await Customer({
      name: customerInputData.name,
      lastName: customerInputData.lastName,
      active: customerInputData.active,
      physicalAddress: customerInputData.physicalAddress,
      photoUrl: customerInputData.photoUrl,
      phoneNumber: customerInputData.phoneNumber,
      emailAddress: customerInputData.emailAddress,
      coordinates: customerInputData.coordinates,
      favoriteCategories: customerInputData.favoriteCategories,
      userId: req.user.id,
    });

    const savedCustomer = await customer.save();
    await savedCustomer.populate("userId");
    await savedCustomer.populate("userId.userRole");

    for (let i = 0; i < savedCustomer.favoriteCategories.length; i++) {
      await savedCustomer.populate(`favoriteCategories.${i}.categoryId`);
    }

    return {
      ...savedCustomer._doc,
      favoriteCategories: savedCustomer.favoriteCategories.map(favoriteCategory => {
        return {
          ...favoriteCategory.categoryId._doc
        }
      }),
      _id: savedCustomer._id.toString(),
    };
  },
  editCustomer: async ({ customerInputData }, req) => {
    console.log(customerInputData);
    if (customerInputData.userId == req.user.id) {
      const customer = await Customer.findById(customerInputData.ID);
      customer.name = customerInputData.name;
      customer.lastName = customerInputData.lastName;
      customer.active = customerInputData.active ? customer.active : true;
      customer.photoUrl = customerInputData.photoUrl,
      customer.physicalAddress = customerInputData.physicalAddress;
      customer.phoneNumber = customerInputData.phoneNumber;
      customer.emailAddress = customerInputData.emailAddress;
      customer.coordinates = customerInputData.coordinates;
      customer.favoriteCategories = customerInputData.favoriteCategories;
      customer.userId = req.user.id;
      const savedCustomer = await customer.save();
      return {
        ...savedCustomer._doc,
        _id: savedCustomer._id.toString(),
      };
    } else {
      return {
        errorText: "you are not allowed",
      };
    }
  },
  deleteCustomer: async ({ ID, userId }, req) => {
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

    // if (req.user.id == userId) {
    //   await Customer.deleteOne({ _id: ID });
    //   return "deleted successfuly";
    // } else {
    //   return "deletion failed";
    // }

    await Customer.deleteOne({ _id: ID });
    return "deleted successfuly";
  },
};
