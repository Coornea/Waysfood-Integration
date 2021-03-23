exports.get = (req, res) => {
  try {
    res.send({
      status: "success",
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.getDetail = (req, res) => {
  try {
    res.send({
      status: "success",
      message: "... data collected",
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.add = (req, res) => {
  try {
    res.send({
      status: "success",
      message: "... data added",
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.update = (req, res) => {
  try {
    res.send({
      status: "success",
      message: "... data updated",
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.delete = (req, res) => {
  try {
    res.send({
      status: "success",
      message: "... data deleted",
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
