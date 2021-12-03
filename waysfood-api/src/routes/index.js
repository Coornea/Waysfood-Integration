const express = require("express");

const router = express.Router();

// Import Middleware
const { auth } = require("../middlewares/auth");
const { uploadFiles } = require("../middlewares/uploadFile");

// Controllers
const { register, signIn } = require("../controllers/auth");

const {
   addUser,
   getUsers,
   getUser,
   updateUser,
   deleteUser,
   getUserProducts,
} = require("../controllers/user");

const {
   addProduct,
   getProducts,
   getProduct,
   getDetailProduct,
   updateProduct,
   deleteProduct,
} = require("../controllers/product");

const { addTransaction, getTransactions } = require("../controllers/transaction");

// Routes
// Auth
router.post("/register", register);
router.post("/login", signIn);

// User Routes
router.post("/user", addUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);

router.get("/user-products", getUserProducts);

// Product Routes
router.post("/product", auth, uploadFiles("image"), addProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.get("/product/:id", getDetailProduct);
router.patch("/product/:id", auth, updateProduct);
router.delete("/product/:id", auth, deleteProduct);

// Transaction Routes
router.post("/transaction", addTransaction);
router.get("/transactions", getTransactions);

// Exports Module
module.exports = router;
