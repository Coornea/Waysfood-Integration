// "use strict";
const { user, product, order, transaction } = require("../../models");

exports.addTransaction = async (req, res) => {
   try {
      const data = req.body;
      const newTransaction = await transaction.create(data);

      res.send({
         status: "Success!",
         message: "Add transaction Finished!",
         data: {
            transaction: newTransaction,
         },
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};

exports.getTransactions = async (req, res) => {
   try {
      const dataTransaction = await transaction.findAll({
         attributes: {
            exclude: ["createdAt", "updatedAt", "idBuyer", "idSeller", "idProduct"],
         },
         include: [
            {
               model: order,
               as: "orders",
               attributes: {
                  exclude: ["createdAt", "updatedAt", "idUser", "qty", "price"],
               },
            },
            {
               model: user,
               as: "buyer",
               attributes: {
                  exclude: ["createdAt", "updatedAt", "password", "status"],
               },
            },
            {
               model: user,
               as: "seller",
               attributes: {
                  exclude: ["createdAt", "updatedAt", "password", "status"],
               },
            },
         ],
      });

      res.send({
         status: "Success!",
         dataTransaction,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};
