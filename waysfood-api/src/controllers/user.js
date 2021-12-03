const { user, product, transaction } = require("../../models");

exports.addUser = async (req, res) => {
   try {
      const data = req.body;

      const response = await user.create(data);

      res.send({
         status: "Success!",
         message: "Add User Finished!",
         data: response,
      });
   } catch (error) {
      console.log(error);
      res.send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};

exports.getUsers = async (req, res) => {
   try {
      const users = await user.findAll({
         attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
         },
      });

      res.send({
         status: "Success!",
         data: {
            users,
         },
      });
   } catch (error) {
      console.log(error);
      res.send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};

exports.getUser = async (req, res) => {
   try {
      const { id } = req.params;

      const userData = await user.findOne({
         where: {
            id,
         },
         attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
         },
      });

      res.send({
         status: "Success!",
         data: {
            user: userData,
         },
      });
   } catch (error) {
      console.log(error);
      res.send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};

exports.updateUser = async (req, res) => {
   try {
      const { id } = req.params;

      const data = req.body;

      const userData = await user.update(data, {
         where: {
            id,
         },
         // attributes: {
         //   exclude: ["password", "createdAt", "updatedAt"],
         // },
      });

      res.send({
         status: "Success!",
         message: `Update User with id ${id}, Finished!`,
         data: req.body,
      });
   } catch (error) {
      console.log(error);
      res.send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};

exports.deleteUser = async (req, res) => {
   try {
      const { id } = req.params;

      const userData = await user.findOne({
         where: {
            id,
         },
      });

      if (!userData) {
         return res.send({
            status: "Failed!",
            message: `User with id ${id}, not found!`,
         });
      }

      await user.destroy({
         where: {
            id,
         },
      });

      res.send({
         status: "Success!",
         message: `Delete User with id ${id}, Finished!`,
         data: {
            id,
         },
      });
   } catch (error) {
      console.log(error);
      res.send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};

exports.getUserProducts = async (req, res) => {
   try {
      const data = await user.findAll({
         attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
         },
         where: {
            role: "Partner",
         },
         include: {
            model: product,
            as: "products",
         },
      });

      res.send({
         status: "Success!",
         data: {
            users: data,
         },
      });
   } catch (error) {
      console.log(error);
      res.send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};
