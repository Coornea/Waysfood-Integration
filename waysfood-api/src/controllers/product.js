const { product, user } = require("../../models");

const joi = require("joi");

// Not Finished
exports.addProduct = async (req, res) => {
   const schema = joi.object({
      title: joi.string().min(3).required(),
      price: joi.number().required(),
      qty: joi.number().required(),
   });

   const { error } = schema.validate(req.body);

   if (error) {
      console.log(error);
      return res.status(400).send({
         error: error.details[0].message,
      });
   }

   try {
      const newProduct = await product.create({
         ...req.body,
         image: req.file.filename,
         idUser: req.user.id,
         // qty: req.user.qty,
      });
      const userData = await product.findOne({
         include: {
            model: user,
            as: "user",
            attributes: {
               exclude: ["password", "gender", "role", "image", "createdAt", "updatedAt"],
            },
         },
         attributes: {
            exclude: ["idUser", "createdAt", "updatedAt"],
         },
         where: {
            id: newProduct.id,
         },
      });
      res.send({
         status: "Success!",
         message: "Add Product Finished!",
         userData,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};

exports.getProducts = async (req, res) => {
   try {
      let products = await product.findAll({
         include: {
            model: user,
            as: "user",
            attributes: {
               exclude: ["password", "gender", "role", "image", "createdAt", "updatedAt"],
            },
         },
         attributes: {
            exclude: ["idUser", "createdAt", "updatedAt"],
         },
      });
      products = JSON.parse(JSON.stringify(products));
      products = products.map((item) => {
         return {
            ...item,
            image: process.env.PATH_FILE + item.image,
         };
      });

      res.send({
         status: "Success!",
         data: {
            products,
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

exports.getProduct = async (req, res) => {
   try {
      const { id } = req.params;

      const productData = await product.findOne({
         where: {
            id,
         },
         attributes: {
            exclude: ["idUser", "createdAt", "updatedAt"],
         },
      });

      res.send({
         status: "Success!",
         data: {
            products: productData,
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

exports.getDetailProduct = async (req, res) => {
   try {
      const { id } = req.params;
      const productDetail = await product.findOne({
         where: {
            id,
         },
         include: {
            model: user,
            as: "user",
            attributes: {
               exclude: ["password", "gender", "role", "image", "createdAt", "updatedAt"],
            },
         },
         attributes: {
            exclude: ["createdAt", "updatedAt"],
         },
      });
      res.send({
         status: "Success!",
         data: {
            id: productDetail.id,
            title: productDetail.title,
            price: productDetail.price,
            image: process.env.PATH_FILE + productDetail.image,
            qty: 35,
            user: productDetail.user,
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

exports.updateProduct = async (req, res) => {
   try {
      const { id } = req.params;
      const newData = req.body;
      await product.update(newData, {
         where: {
            id,
         },
      });
      const productDetail = await product.findOne({
         where: {
            id,
         },
         include: {
            model: user,
            as: "user",
            attributes: {
               exclude: ["password", "gender", "role", "image", "createdAt", "updatedAt"],
            },
         },
         attributes: {
            exclude: ["idUser", "createdAt", "updatedAt"],
         },
      });

      res.send({
         status: "Success!",
         message: `Update Product with id ${id}, Finished!`,
         productDetail,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};

exports.deleteProduct = async (req, res) => {
   try {
      const { id } = req.params;

      const productData = await product.findOne({
         where: {
            id,
         },
      });

      if (!productData) {
         return res.send({
            status: "Failed!",
            message: `Product with id ${id}, not found!`,
         });
      }

      await product.destroy({
         where: {
            id,
         },
      });

      res.send({
         status: "Success!",
         message: `Delete Product with id ${id}, Finished!`,
         data: {
            id: productData.id,
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
