exports.get = (req, res) => {
   try {
      res.send({
         status: "Success!",
         data: {},
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error!",
      });
   }
};

exports.getDetail = (req, res) => {
   try {
      res.send({
         status: "Success!",
         message: "... Data Collected!",
         data: {},
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error!",
      });
   }
};

exports.add = (req, res) => {
   try {
      res.send({
         status: "Success!",
         message: "... Data Has Been Added!",
         data: {},
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error!",
      });
   }
};

exports.update = (req, res) => {
   try {
      res.send({
         status: "Success!",
         message: "... Data Updated!",
         data: {},
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error!",
      });
   }
};

exports.delete = (req, res) => {
   try {
      res.send({
         status: "Success!",
         message: "... Data Deleted!",
         data: {},
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "Failed!",
         message: "Internal Server Error!",
      });
   }
};
