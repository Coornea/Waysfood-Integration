const { User } = require("../../models");

exports.checkPartner = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (user.role === "partner") {
      next();
    } else {
      res.status(401).send({
        status: "failed",
        message: "Role restricted",
      });
    }
  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: "Role restricted",
    });
  }
};

exports.checkUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (user.role === "user") {
      next();
    } else {
      res.status(401).send({
        status: "failed",
        message: "Role restricted",
      });
    }
  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: "Role restricted",
    });
  }
};
