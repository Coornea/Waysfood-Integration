// Import Model
const { user } = require("../../models");

// Import Package
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
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

   try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = await user.create({
         fullName: req.body.fullName,
         email: req.body.email,
         password: hashedPassword,
         gender: req.body.gender,
         phone: req.body.phone,
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
         message: "Server Error!",
      });
   }
};

// Login
exports.signIn = async (req, res) => {
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
            status: "Failed!",
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
