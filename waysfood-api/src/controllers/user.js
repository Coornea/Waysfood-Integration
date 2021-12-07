const { user, product, transaction } = require("../../models");
const bcrypt = require("bcrypt");

// Add User has been deleted, cause we need to use register

exports.getUsers = async (req, res) => {
   try {
      const users = await user.findAll({
         attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
         },
      });

      const usersConvert = JSON.parse(JSON.stringify(users));
      const userData = usersConvert.map((user) => {
         return {
            ...user,
            image: process.env.PATH_FILE + user.image,
         };
      });

      res.status(200).send({
         status: "Success!",
         data: {
            userData,
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

      const users = await user.findOne({
         where: {
            id,
         },
         attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
         },
      });

      const usersConvert = JSON.parse(JSON.stringify(users));
      const userData = {
         ...usersConvert,
         image: process.env.PATH_FILE + usersConvert.image,
      };

      res.status(200).send({
         status: "Success!",
         data: {
            user: userData,
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

exports.updateUser = async (req, res) => {
   try {
      const { id } = req.params;

      if (req.user.id != id) {
         return res.status(401).send({
            status: "Failed!",
            message: "You don't have permission!",
         });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, salt[10]);

      await user.update(
         {
            ...req.body,
            password: hashedPassword,
            image: req.files.image && req.files.image[0].filename,
         },
         {
            where: {
               id,
            },
         }
      );

      const rawUser = await user.findOne({
         where: { id },
         attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
         },
      });

      if (rawUser == null) {
         return res.status(404).send({
            status: "Failed!",
            message: "User doesn't available!",
         });
      }

      const rawUserConvert = JSON.parse(JSON.stringify(rawUser));
      const userData = {
         ...rawUserConvert,
         image: process.env.PATH_FILE + rawUserConvert.image,
      };

      res.status(200).send({
         status: "Success!",
         message: `Update User with id ${id}, Finished!`,
         data: userData,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error!",
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

      res.status(200).send({
         status: "Success!",
         message: `Delete User with id ${id}, Finished!`,
         data: {
            id,
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
