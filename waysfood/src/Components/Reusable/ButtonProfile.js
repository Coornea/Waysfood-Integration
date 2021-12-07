import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Alert } from "react-bootstrap";
import { motion } from "framer-motion/dist/es/";

// State Management
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";

// Assets
import userIcon from "../../Assets/svg/user.svg";
import foods from "../../Assets/svg/foods.svg";
import logoutIcon from "../../Assets/svg/logout.svg";
import cartIcon from "../../Assets/svg/cart.svg";

export default function ButtonProfile() {
   const navigate = useNavigate();

   // const { state: userState, dispatch: userDispatch } = useContext(UserContext);
   const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

   const [alert, setAlert] = useState(null);
   const hideAlert = () => {
      setAlert(null);
   };
   const showAlert = () => {
      setAlert(<Alert onClick={hideAlert}>Please Order to see your cart!</Alert>);
   };
   const handleLogout = () => {
      cartDispatch({
         type: "EMPTY_CART",
      });
      // userDispatch({
      //    type: "LOGOUT",
      // });
      navigate("/");
   };
   return (
      <>
         <Link
         // to={userState.loggedUser.role === "Partner" ? "/landing-partner" : "/"}
         // onClick={() => {
         //    userState.loggedUser.role !== "partner" && cartState.carts.length == 0 && showAlert();
         // }}
         >
            <motion.div
               whileHover={{
                  rotate: [0, 20, -20, 20, -20, 0],
                  transition: { duration: 0.5 },
               }}
               style={{ width: "40px", height: "40px", position: "relative" }}
            >
               {cartState.carts.length > 0 && (
                  <div
                     className="cart-badge"
                     style={{
                        width: "15px",
                        height: "15px",
                        position: "absolute",
                        right: "0px",
                        top: "8px",
                        borderRadius: "10px",
                     }}
                     className="bg-danger d-flex align-item-center justify-content-center"
                  >
                     <small
                        style={{
                           fontSize: "12px",
                           color: "white",
                           fontWeight: "bold",
                        }}
                     >
                        {cartState.carts.length}
                     </small>
                  </div>
               )}
               <img src={cartIcon} alt="cart" width="40" />
            </motion.div>
         </Link>
         <Dropdown className="ml-2">
            <Dropdown.Toggle
               variant="warning"
               style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
               }}
            >
               <img
                  // src={userState.loggedUser.image}
                  alt="photos"
                  width="64"
                  height="64"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
               />
            </Dropdown.Toggle>

            <Dropdown.Menu
               style={{
                  position: "absolute",
                  // left: userState.loggedUser.role === "partner" ? "-100px" : "-50px",
                  fontSize: "1.2em",
               }}
            >
               <Dropdown.Item as={Link} to="/profile" className="py-2">
                  <img src={userIcon} alt="icon" width="30" className="mr-2" /> Profile
               </Dropdown.Item>
               {/* {userState.loggedUser.role === "partner" && ( */}
               <Dropdown.Item as={Link} to="/add" className="py-2">
                  <img src={foods} alt="add product icon" width="30" className="mr-2" /> Add Product
               </Dropdown.Item>
               {/* )} */}
               <Dropdown.Divider />
               <Dropdown.Item href="#!" onClick={handleLogout} className="py-2">
                  <img
                     src={logoutIcon}
                     alt="logout icon"
                     className="mr-2"
                     width="30"
                     style={{ objectFit: "cover" }}
                  />{" "}
                  Logout
               </Dropdown.Item>
            </Dropdown.Menu>
         </Dropdown>
         {alert}
      </>
   );
}
