const { product, user } = require("../../models");

const joi = require("joi");

exports.addProduct = async (req, res) => {
   const schema = joi.object({
      title: joi.string().min(3).required(),
      price: joi.number().required(),
      qty: joi.number().required(),
   });

   const { error } = schema.validate(req.body);
   if (!req.files.image) {
      return res.status(400).send({
         status: "Failed!",
         message: "Please insert an image to upload!",
      });
   }

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
      const rawProduct = await product.findOne({
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
      const rawProductConvert = JSON.parse(JSON.stringify(rawProduct));
      const productData = {
         ...rawProductConvert,
         image: process.env.PATH_FILE + rawProductConvert.image,
      };
      res.status(200).send({
         status: "Success!",
         message: "Add Product Finished!",
         productData,
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
      productsConvert = JSON.parse(JSON.stringify(products));
      productData = productsConvert.map((item) => {
         return {
            ...item,
            image: process.env.PATH_FILE + item.image,
         };
      });

      res.status(200).send({
         status: "Success!",
         data: productData,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};

exports.getProductsByPartner = async (req, res) => {
   try {
      const { id } = req.params;

      const products = await product.findAll({
         include: {
            model: user,
            as: "user",
            attributes: [],
            where: {
               id,
               role: "Partner",
            },
         },
         attributes: {
            exclude: ["idUser", "createdAt", "updatedAt"],
         },
      });

      const productsConvert = JSON.parse(JSON.stringify(products));
      const productsData = productsConvert.map((product) => {
         return {
            ...product,
            image: process.env.PATH_FILE + product.image,
         };
      });

      res.send({
         status: "Success!",
         data: {
            products: productsData,
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
      if (productDetail == null) {
         return res.status(404).send({
            status: "Failed!",
            message: "Product doesn't availabe!",
         });
      }
      res.send({
         status: "Success!",
         data: {
            id: productDetail.id,
            title: productDetail.title,
            price: productDetail.price,
            image: process.env.PATH_FILE + productDetail.image,
            qty: productDetail.qty,
            user: productDetail.user,
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

exports.updateProduct = async (req, res) => {
   const schema = joi.object({
      title: joi.string().min(3).required(),
      price: joi.number().required(),
      qty: joi.number().required(),
   });

   const { error } = schema.validate(req.body);
   if (!req.files.image) {
      return res.status(400).send({
         status: "Failed!",
         message: "Please insert an image to upload!",
      });
   }

   if (error) {
      console.log(error);
      return res.status(400).send({
         error: error.details[0].message,
      });
   }

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
      const productDetailConvert = JSON.parse(JSON.stringify(productDetail));
      const productData = {
         ...productDetailConvert,
         image: process.env.PATH_FILE + productDetailConvert.image,
      };

      res.send({
         status: "Success!",
         message: `Update Product with id ${id}, Finished!`,
         productData,
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
      if (productData.idUser !== req.user.id) {
         return re.status(401).send({
            status: "Failed!",
            message: "You don't have permission!",
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
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error!",
      });
   }
};
