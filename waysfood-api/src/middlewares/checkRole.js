const { user } = require("../../models");

exports.checkPartner = async (req, res, next) => {
   try {
      const userCheck = await user.findOne({
         where: { id: req.user.id },
      });

      if (userCheck.role === "Partner") {
         next();
      } else {
         res.status(401).send({
            status: "Failed!",
            message: "Role Restricted!",
         });
      }
   } catch (error) {
      console.log(error);
   }
};

exports.checkCustomer = async (req, res, next) => {
   try {
      const userCheck = await user.findOne({
         where: { id: req.user.id },
      });

      if (userCheck.role === "Customer") {
         next();
      } else {
         res.status(401).send({
            status: "Failed!",
            message: "Role Restricted!",
         });
      }
   } catch (error) {
      console.log(error);
   }
};
