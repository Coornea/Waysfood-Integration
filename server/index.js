const express = require("express");
const router = require("./src/routes");
require("dotenv").config();

const app = express();

const port = 3030;

app.use(express.json());

app.use("/api/v1", router);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
