// Import Model
const { user } = require("../../models");

// Import Package
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
   const { email, password } = req.body;
   const schema = joi.object({
      fullName: joi.string().min(3).required(),
      email: joi.string().email().min(5).required(),
      password: joi.string().min(4).required(),
      gender: joi.string().allow(""),
      phone: joi.string().required(),
      role: joi.string().required(),
   });

   const { error } = schema.validate(req.body);

   if (error) {
      console.log(error);
      return res.status(400).send({
         error: error.details[0].message,
      });
   }

   // Checking Email Status
   const checkEmail = await user.findOne({
      where: {
         email,
      },
   });

   if (checkEmail) {
      return res.status(400).send({
         status: "Failed to Register!",
         message: "Email already registered!",
      });
   }

   try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = await user.create({
         ...req.body,
         password: hashedPassword,
         image: req.body.role === "Customer" ? "customer-default.jpg" : "partner-default.jpg",
         role: req.body.role,
      });

      const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);

      res.status(200).send({
         status: "Success!",
         message: "Register Finished!",
         data: {
            user: {
               fullName: newUser.fullName,
               email: newUser.email,
               token,
               role: newUser.role,
            },
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

// Login
exports.login = async (req, res) => {
   const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
   });

   const { error } = schema.validate(req.body);

   if (error) {
      console.log(error);
      return res.status(400).send({
         error: {
            message: error.details[0].message,
         },
      });
   }

   try {
      const { email, password } = req.body;

      const userExist = await user.findOne({
         where: {
            email,
         },
      });

      // Email Validation
      if (!userExist) {
         return res.status(400).send({
            status: "Login Failed!",
            message: "Email & Password not match!",
         });
      }

      // Compare Password
      const isValid = await bcrypt.compare(password, userExist.password);

      // Password Validation
      if (!isValid) {
         return res.status(400).send({
            status: "Failed!",
            message: "Email & Password not match!",
         });
      }

      const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY);

      res.send({
         status: "Success!",
         message: "Login Success!",
         data: {
            user: {
               fullName: userExist.fullName,
               email: userExist.email,
               role: userExist.role,
               token,
            },
         },
      });
   } catch (error) {
      console.log(error);
      console.log("this errrr");
      res.status(500).send({
         status: "Failed!",
         message: "Server Error!",
      });
   }
};

// Auth Check
exports.checkAuth = async (req, res) => {
   try {
      const { id } = req.user;
      const rawUser = await user.findOne({
         where: { id },
         attributes: {
            exclude: ["createdAt", "updatedAt", "password", "gender"],
         },
      });
      if (rawUser == null) {
         return res.status(404).send({
            status: "Failed!",
            message: "User Not Found!",
         });
      }
      const userString = JSON.stringify(rawUser);
      const userObject = JSON.parse(userString);

      const user = {
         ...userObject,
         image: process.env.PATH_FILE + userObject.image,
      };
      res.status(400).send({
         status: "Success!",
         message: "Success Get User Data!",
         data: {
            user,
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
