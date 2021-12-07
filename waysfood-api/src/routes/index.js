const express = require("express");

const router = express.Router();

// Import Middleware
const { auth } = require("../middlewares/auth");
const { uploadFiles } = require("../middlewares/uploadFile");

// Controllers
const { register, login } = require("../controllers/auth");

const { getUsers, getUser, updateUser, deleteUser, getUserProducts } = require("../controllers/user");

const {
   addProduct,
   getProducts,
   getProductsByPartner,
   getDetailProduct,
   updateProduct,
   deleteProduct,
} = require("../controllers/product");

const {
   addTransaction,
   getTransactionsByPartner,
   getDetailTransaction,
   getUserTransaction,
   deleteTransaction,
} = require("../controllers/transaction");
const { checkCustomer, checkPartner } = require("../middlewares/checkRole");

// Routes
// Auth
router.post("/register", register);
router.post("/login", login);

// User Routes
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);

router.get("/user-products", getUserProducts);

// Product Routes
router.post("/product", uploadFiles("image"), addProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductsByPartner);
router.get("/product/:id", getDetailProduct);
router.patch("/product/:id", auth, updateProduct);
router.delete("/product/:id", auth, deleteProduct);

// Transaction Routes
router.post("/transaction", auth, checkCustomer, addTransaction);
router.get("/transactions/:id", auth, checkPartner, getTransactionsByPartner);
router.get("/transaction/:id", auth, getDetailTransaction);
router.get("/my-transactions/:id", auth, checkCustomer, getDetailProduct);
router.delete("/transaction/:id", auth, checkCustomer, deleteTransaction);

// Exports Module
module.exports = router;
