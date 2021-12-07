// Import dotenv
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Get routes to variable router
const router = require("./src/routes");

const app = express();

const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
// Add code to serving static files
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Listening on port ${port} server is running!`));
