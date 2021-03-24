const express = require("express");
const router = require("./src/routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = 3030;

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
