const { user, product, order, transaction } = require("../../models");

exports.addTransaction = async (req, res) => {
   try {
      const data = req.body;
      const { id } = req.user;

      const newTransaction = await transaction.create({
         idUser: id,
         idPartner,
         status: "Waiting Approve",
      });
      await order.bulkCreate(
         data.products.map((product) => ({
            idProduct: product.id,
            idTransaction: newTransaction.id,
            qty: product.qty,
         }))
      );

      const rawTransaction = await transaction.findOne({
         where: {
            id: newTransaction.id,
         },
         include: [
            {
               model: user,
               as: "buyer",
               attributes: {
                  exclude: ["createdAt", "updatedAt", "password", "phone", "image", "role", "gender"],
               },
            },
            {
               model: user,
               as: "seller",
               attributes: {
                  exclude: ["createdAt", "updatedAt", "password", "phone", "image", "role", "gender"],
               },
            },
            {
               model: order,
               as: "order",
               include: [
                  {
                     model: product,
                     as: "product",
                     attributes: {
                        exclude: ["createdAt", "updatedAt", "idUser"],
                     },
                  },
               ],
               attributes: {
                  exclude: ["createdAt", "updatedAt", "idTransaction", "idProduct"],
               },
            },
         ],
         attributes: {
            exclude: ["createdAt", "updatedAt", "idUser", "idPartner"],
         },
      });

      const rawTransactionConvert = JSON.parse(JSON.stringify(rawTransaction));
      const transactionData = {
         ...rawTransactionConvert,
         order: [
            ...rawTransactionConvert.order.map((order) => ({
               // id: order.id,
               ...order.product,
               image: process.env.PATH_FILE + order.product.image,
               qty: order.qty,
            })),
         ],
      };

      res.send({
         status: "Success!",
         message: "Add transaction Finished!",
         data: {
            transactionData,
         },
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error!",
      });
   }
};

exports.getTransactionsByPartner = async (req, res) => {
   try {
      const dataTransactions = await transaction.findAll({
         attributes: {
            exclude: ["createdAt", "updatedAt", "idPartner"],
         },
         include: [
            {
               model: order,
               as: "order",
               include: [
                  {
                     model: product,
                     as: "product",
                     attributes: {
                        exclude: ["createdAt", "updatedAt", "idUser"],
                     },
                     where: { idUser: id },
                  },
               ],
               attributes: {
                  exclude: ["createdAt", "updatedAt", "idTransaction", "idProduct"],
               },
            },
            {
               model: user,
               as: "buyer",
               attributes: {
                  exclude: ["createdAt", "updatedAt", "password", "phone", "image", "gender", "role"],
               },
            },
            {
               model: user,
               as: "seller",
               attributes: {
                  exclude: ["createdAt", "updatedAt", "password", "phone", "image", "gender", "role"],
               },
            },
         ],
         order: [["createdAt", "DESC"]],
      });

      const dataTransactionsConvert = JSON.parse(JSON.stringify(dataTransactionsConvert));
      const transactionData = dataTransactionsConvert.map((trans) => {
         return {
            ...trans,
            order: [
               ...trans.order.map((order) => ({
                  // id: order.id,
                  ...order.product,
                  image: process.env.PATH_FILE + order.product.image,
                  qty: order.qty,
               })),
            ],
         };
      });

      res.send({
         status: "Success!",
         transactionData,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error!",
      });
   }
};

exports.getDetailTransaction = async (req, res) => {
   try {
      const { id } = req.params;
      const rawTransactions = await transaction.findOne({
         include: [
            {
               model: user,
               as: "buyer",
               attributes: {
                  exclude: ["createdAt", "updatedAt", "password", "phone", "image", "role", "gender"],
               },
            },
            {
               model: user,
               as: "seller",
               attributes: {
                  exclude: ["createdAt", "updatedAt", "password", "phone", "image", "role", "gender"],
               },
            },
            {
               model: order,
               as: "order",
               include: [
                  {
                     model: product,
                     as: "product",
                     attributes: {
                        exclude: ["createdAt", "updatedAt", "idUser"],
                     },
                  },
               ],

               attributes: {
                  exclude: ["createdAt", "updatedAt", "idTransaction", "idProduct"],
               },
            },
         ],
         attributes: {
            exclude: ["updatedAt", "userId", "idPartner"],
         },
         where: {
            id,
         },
      });

      if (rawTransactions == null)
         return res.status(404).send({
            status: "Failed!",
            message: "Transaction doesn't available!",
         });

      const rawTransactionsConvert = JSON.parse(JSON.stringify(rawTransactions));

      const transactionData = rawTransactionsConvert.order
         ? {
              ...rawTransactionsConvert,
              order: [
                 ...rawTransactionsConvert.order.map((order) => ({
                    // id: order.id,
                    ...order.product,
                    image: url + order.product.image,
                    qty: order.qty,
                 })),
              ],
           }
         : {
              ...rawTransactionsConvert,
              order: [],
           };

      res.status(200).send({
         status: "Success!",
         message: "Success get product detail",
         data: {
            transactionData,
         },
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error",
      });
   }
};

exports.getUserTransaction = async (req, res) => {
   try {
      const { id } = req.params;

      if (req.user.id != id)
         return res.status(401).send({
            status: "Failed!",
            message: "User doesn't have access!",
         });

      const rawTransactions = await transaction.findAll({
         include: [
            {
               model: user,
               as: "buyer",
               attributes: [],
               where: {
                  id,
               },
            },
            {
               model: user,
               as: "seller",
               attributes: {
                  exclude: ["createdAt", "updatedAt", "password", "phone", "image", "role", "gender"],
               },
            },
            {
               model: order,
               as: "order",
               include: [
                  {
                     model: product,
                     as: "product",
                     attributes: {
                        exclude: ["createdAt", "updatedAt", "idUser"],
                     },
                  },
               ],

               attributes: {
                  exclude: ["createdAt", "updatedAt", "idTransaction", "idProduct"],
               },
            },
         ],
         attributes: {
            exclude: ["updatedAt", "idUser", "idPartner"],
         },
         order: [["createdAt", "DESC"]],
      });

      const rawTransactionsConvert = JSON.parse(JSON.stringify(rawTransactions));
      const transactionData = rawTransactionsConvert.map((trans) => {
         return {
            ...trans,
            order: [
               ...trans.order.map((order) => ({
                  // id: order.id,
                  ...order.product,
                  image: process.env.PATH_FILE + order.product.image,
                  qty: order.qty,
               })),
            ],
         };
      });

      res.status(200).send({
         status: "Success!",
         message: "Success get product by user id",
         data: {
            transactionData,
         },
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error",
      });
   }
};

exports.deleteTransaction = async (req, res) => {
   try {
      const { id } = req.params;
      const rawTransactions = await transaction.findOne({
         where: {
            id,
         },
      });

      if (rawTransactions == null)
         return res.status(400).send({
            status: "Failed!",
            message: "Transaction doesn't available",
         });

      await transaction.destroy({
         where: {
            id,
         },
      });

      res.status(200).send({
         status: "Success!",
         message: "Success remove transaction",
         data: {
            id: parseInt(id),
         },
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error",
      });
   }
};

// exports.updateTransaction = async (req, res) => {
//    try {
//       const { id } = req.params;

//       const editTransaction = await Transaction.update(
//          { status: req.body.status },
//          {
//             where: {
//                id,
//             },
//          }
//       );

//       const rawTransaction = await Transaction.findOne({
//          include: [
//             {
//                model: User,
//                as: "userOrder",
//                attributes: {
//                   exclude: ["createdAt", "updatedAt", "password", "phone", "image", "role", "gender"],
//                },
//             },
//             {
//                model: User,
//                as: "partnerOrder",
//                attributes: {
//                   exclude: ["createdAt", "updatedAt", "password", "phone", "image", "role", "gender"],
//                },
//             },
//             {
//                model: Order,
//                as: "order",
//                include: [
//                   {
//                      model: Product,
//                      as: "product",
//                      attributes: {
//                         // insert exclude id if want to use order id
//                         exclude: ["createdAt", "updatedAt", "userId"],
//                      },
//                   },
//                ],

//                attributes: {
//                   exclude: ["createdAt", "updatedAt", "transactionId", "productId", "ProductId"],
//                },
//             },
//          ],
//          attributes: {
//             exclude: ["createdAt", "updatedAt", "userId", "partnerId"],
//          },
//          where: {
//             id,
//          },
//       });

//       if (rawTransaction == null)
//          return res.status(404).send({
//             status: "failed",
//             message: "Transaction doesn't available",
//          });

//       const rawTransactionsConvert = JSON.parse(JSON.stringify(rawTransactions));
//       const transaction = transactionObject.order
//          ? {
//               ...transactionObject,
//               order: [
//                  ...transactionObject.order.map((order) => ({
//                     // id: order.id, // uncomment to use order id
//                     ...order.product,
//                     image: url + order.product.image,
//                     qty: order.qty,
//                  })),
//               ],
//            }
//          : {
//               ...transactionObject,
//               order: [],
//            };

//       res.status(200).send({
//          status: "Success!",
//          message: "Success edit product detail",
//          data: {
//             transactionData,
//          },
//       });
//    } catch (err) {
//       console.log(err);
//       res.status(500).send({
//          status: "Failed!",
//          message: "Internal Server Error",
//       });
//    }
// };
