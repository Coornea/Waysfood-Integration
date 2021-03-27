const express = require("express");

const router = express.Router();

const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getPartners,
} = require("../controller/user");
const {
  getAllProducts,
  getProductsByPartner,
  getDetailProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/product");
const {
  getTransactionsByPartner,
  getDetailTransaction,
  getUserTransaction,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controller/transaction");

const { register, login, checkAuth } = require("../controller/auth");

const { authenticated } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/upload");
const { checkPartner, checkUser } = require("../middlewares/checkRole");

// Users routes
router.get("/users", getUsers);
router.get("/partners", getPartners);
router.get("/user/:id", authenticated, getUserById);
router.delete("/user/:id", authenticated, deleteUser);
router.patch("/user/:id", authenticated, uploadFile("image"), updateUser);

// Products routes
router.get("/products", getAllProducts);
router.get("/products/:id", getProductsByPartner);
router.get("/product/:id", getDetailProduct);
router.post(
  "/product/",
  authenticated,
  checkPartner,
  uploadFile("image"),
  addProduct
);
router.patch(
  "/product/:id",
  authenticated,
  checkPartner,
  uploadFile("image"),
  updateProduct
);
router.delete("/product/:id", authenticated, checkPartner, deleteProduct);

// Transactions route
router.get(
  "/transactions/:id",
  authenticated,
  checkPartner,
  getTransactionsByPartner
);
router.get("/transaction/:id", authenticated, getDetailTransaction);
router.get(
  "/my-transactions/:id",
  authenticated,
  checkUser,
  getUserTransaction
);
router.post("/transaction", authenticated, checkUser, addTransaction);
router.delete("/transaction/:id", authenticated, checkUser, deleteTransaction);
router.patch("/transaction/:id", authenticated, updateTransaction);

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", authenticated, checkAuth);

module.exports = router;
