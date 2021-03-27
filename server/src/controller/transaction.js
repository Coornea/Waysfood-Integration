const { User, Product, Transaction, Order } = require("../../models");

exports.getTransactionsByPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const rawTransactions = await Transaction.findAll({
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "image",
              "role",
              "gender",
            ],
          },
        },
        {
          model: User,
          as: "partnerOrder",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "image",
              "role",
              "gender",
            ],
          },
        },
        {
          model: Order,
          as: "order",
          include: [
            {
              model: Product,
              as: "product",
              attributes: {
                // insert exclude id if want to use order id
                exclude: ["createdAt", "updatedAt", "userId"],
              },
              where: {
                userId: id,
              },
            },
          ],

          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "transactionId",
              "productId",
              "ProductId",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "userId", "partnerId"],
      },
      order: [["createdAt", "DESC"]],
    });

    const transactionsString = JSON.stringify(rawTransactions);
    const transactionsObject = JSON.parse(transactionsString);
    const filteredTransaction = transactionsObject.filter(
      (item) => item.order.length
    );
    const url = process.env.UPLOAD_URL;

    const transactions = filteredTransaction.map((trans) => {
      return {
        ...trans,
        order: [
          ...trans.order.map((order) => ({
            // id: order.id, // uncomment to use order id
            ...order.product,
            image: url + order.product.image,
            qty: order.qty,
          })),
        ],
      };
    });

    res.send({
      status: "success",
      message: "Success get product by partner id",
      data: {
        transactions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
exports.getDetailTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const rawTransactions = await Transaction.findOne({
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "image",
              "role",
              "gender",
            ],
          },
        },
        {
          model: User,
          as: "partnerOrder",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "image",
              "role",
              "gender",
            ],
          },
        },
        {
          model: Order,
          as: "order",
          include: [
            {
              model: Product,
              as: "product",
              attributes: {
                // insert exclude id if want to use order id
                exclude: ["createdAt", "updatedAt", "userId"],
              },
            },
          ],

          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "transactionId",
              "productId",
              "ProductId",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "userId", "partnerId"],
      },
      where: {
        id,
      },
    });

    if (rawTransactions == null)
      return res.status(404).send({
        status: "failed",
        message: "Transaction doesn't available",
      });

    const transactionsString = JSON.stringify(rawTransactions);
    const transactionsObject = JSON.parse(transactionsString);
    const url = process.env.UPLOAD_URL;

    const transactions = transactionsObject.order
      ? {
          ...transactionsObject,
          order: [
            ...transactionsObject.order.map((order) => ({
              // id: order.id, // uncomment to use order id
              ...order.product,
              image: url + order.product.image,
              qty: order.qty,
            })),
          ],
        }
      : {
          ...transactionsObject,
          order: [],
        };

    res.send({
      status: "success",
      message: "Success get product detail",
      data: {
        transactions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.getUserTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id != id)
      return res.status(401).send({
        status: "failed",
        message: "User doesn't have access",
      });

    const rawTransactions = await Transaction.findAll({
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: [],
          where: {
            id,
          },
        },
        {
          model: User,
          as: "partnerOrder",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "image",
              "role",
              "gender",
            ],
          },
        },
        {
          model: Order,
          as: "order",
          include: [
            {
              model: Product,
              as: "product",
              attributes: {
                // insert exclude id if want to use order id
                exclude: ["createdAt", "updatedAt", "userId"],
              },
            },
          ],

          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "transactionId",
              "productId",
              "ProductId",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "userId", "partnerId"],
      },
      order: [["createdAt", "DESC"]],
    });

    const transactionsString = JSON.stringify(rawTransactions);
    const transactionsObject = JSON.parse(transactionsString);
    const filteredTransaction = transactionsObject.filter(
      (item) => item.order.length
    );
    const url = process.env.UPLOAD_URL;

    const transactions = filteredTransaction.map((trans) => {
      return {
        ...trans,
        order: [
          ...trans.order.map((order) => ({
            // id: order.id, // uncomment to use order id
            ...order.product,
            image: url + order.product.image,
            qty: order.qty,
          })),
        ],
      };
    });

    res.send({
      status: "success",
      message: "Success get product by user id",
      data: {
        transactions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { products, partnerId } = req.body;
    const { id } = req.user;

    const createTransaction = await Transaction.create({
      userId: id,
      partnerId,
      status: "waiting",
    });

    const addProducts = await Order.bulkCreate(
      products.map((product) => ({
        productId: product.id,
        transactionId: createTransaction.id,
        qty: product.qty,
      }))
    );

    const rawTransaction = await Transaction.findOne({
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "image",
              "role",
              "gender",
            ],
          },
        },
        {
          model: User,
          as: "partnerOrder",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "image",
              "role",
              "gender",
            ],
          },
        },
        {
          model: Order,
          as: "order",
          include: [
            {
              model: Product,
              as: "product",
              attributes: {
                // insert exclude id if want to use order id
                exclude: ["createdAt", "updatedAt", "userId"],
              },
            },
          ],
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "transactionId",
              "productId",
              "ProductId",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "partnerId"],
      },
      where: {
        id: createTransaction.id,
      },
    });

    const transactionString = JSON.stringify(rawTransaction);
    const transactionObject = JSON.parse(transactionString);
    const url = process.env.UPLOAD_URL;

    const transaction = {
      ...transactionObject,
      order: [
        ...transactionObject.order.map((order) => ({
          // id: order.id, // uncomment to use order id
          ...order.product,
          image: url + order.product.image,
          qty: order.qty,
        })),
      ],
    };

    res.send({
      status: "success",
      message: "Success add transaction & waiting for approval",
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const rawTransactions = await Transaction.findOne({
      where: {
        id,
      },
    });

    if (rawTransactions == null)
      return res.status(400).send({
        status: "failed",
        message: "Transaction doesn't available",
      });

    const removeTransactions = await Transaction.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "Success remove transaction",
      data: {
        id: parseInt(id),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const editTransaction = await Transaction.update(
      { status: req.body.status },
      {
        where: {
          id,
        },
      }
    );

    const rawTransaction = await Transaction.findOne({
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "image",
              "role",
              "gender",
            ],
          },
        },
        {
          model: User,
          as: "partnerOrder",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "image",
              "role",
              "gender",
            ],
          },
        },
        {
          model: Order,
          as: "order",
          include: [
            {
              model: Product,
              as: "product",
              attributes: {
                // insert exclude id if want to use order id
                exclude: ["createdAt", "updatedAt", "userId"],
              },
            },
          ],

          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "transactionId",
              "productId",
              "ProductId",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "partnerId"],
      },
      where: {
        id,
      },
    });

    if (rawTransaction == null)
      return res.status(404).send({
        status: "failed",
        message: "Transaction doesn't available",
      });

    const transactionString = JSON.stringify(rawTransaction);
    const transactionObject = JSON.parse(transactionString);
    const url = process.env.UPLOAD_URL;

    const transaction = transactionObject.order
      ? {
          ...transactionObject,
          order: [
            ...transactionObject.order.map((order) => ({
              // id: order.id, // uncomment to use order id
              ...order.product,
              image: url + order.product.image,
              qty: order.qty,
            })),
          ],
        }
      : {
          ...transactionObject,
          order: [],
        };

    res.send({
      status: "success",
      message: "Success edit product detail",
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
