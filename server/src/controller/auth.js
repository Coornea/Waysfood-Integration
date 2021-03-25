const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const schema = Joi.object({
      email: Joi.string().email().min(10).max(30).required(),
      password: Joi.string().min(5).max(20).required(),
      fullName: Joi.string().max(50).required(),
      gender: Joi.string().max(20).required(),
      phone: Joi.string().min(5).max(13).required(),
      role: Joi.string().max(10).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail)
      return res.status(400).send({
        status: "register failed",
        message: "Email already registered",
      });

    const hashStrength = 10;
    const hashedPassword = await bcrypt.hash(password, hashStrength);

    const user = await User.create({
      ...req.body,
      location: null,
      image:
        req.body.role === "user" ? "user-default.png" : "partner-default.png",
      password: hashedPassword,
    });

    const secretKey = process.env.JWT_SECRET_TOKEN;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    const url = process.env.UPLOAD_URL;

    res.send({
      status: "success",
      message: "Register success",

      data: {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          image: url + user.image,
          role: user.role,
          phone: user.phone,
          token,
        },
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(10).max(30).required(),
      password: Joi.string().min(5).max(20).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const validateUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!validateUser)
      return res.status(400).send({
        status: "login failed",
        message: "Invalid credentials",
      });

    const isValidPass = await bcrypt.compare(password, validateUser.password);

    if (!isValidPass) {
      return res.status(400).send({
        status: "login failed",
        message: "Invalid credentials",
      });
    }

    const secretKey = process.env.JWT_SECRET_TOKEN;
    const token = jwt.sign(
      {
        id: validateUser.id,
      },
      secretKey
    );

    const url = process.env.UPLOAD_URL;

    res.send({
      status: "success",
      message: "Login success",
      data: {
        user: {
          id: validateUser.id,
          fullName: validateUser.fullName,
          email: validateUser.email,
          image: url + validateUser.image,
          role: validateUser.role,
          phone: validateUser.phone,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const { id } = req.user;
    const rawUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "gender"],
      },
    });
    if (rawUser == null)
      return res.status(404).send({
        status: "failed",
        message: "User doesn't available",
      });

    const userString = JSON.stringify(rawUser);
    const userObject = JSON.parse(userString);
    const url = process.env.UPLOAD_URL;
    const user = {
      ...userObject,
      image: url + userObject.image,
    };
    res.send({
      status: "success",
      message: "Success get user data",
      data: {
        user,
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
