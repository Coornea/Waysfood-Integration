import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// State Management
import { CartContext } from "../../../Context/CartContext";
import { UserContext } from "../../../Context/UserContext";

import { setAuthToken, API } from "../../../Config/API";

import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import styles from "./CartPage.module.css";
import MapsPopUp from "../../../Components/Modals/MapsPopUp/MapsPopUp";

import bin from "../../../Assets/png/bin.png";
import paketGeprek from "../../../Assets/paket-geprek.jpg";
import map from "../../../Assets/png/map.png";

export default function CartPage() {
   const navigate = useNavigate();
   const { state: userState, dispatch: userDispatch } = useContext(UserContext);
   const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

   // Modal Handler
   const [show, setShow] = useState(false);
   const handleShowMaps = () => setShow(true);
   const handleCloseMaps = () => setShow(false);

   const [quantity, setQuantity] = useState(0);
   const [price, setPrice] = useState(0);
   const [delivery, setDelivery] = useState(1000);
   const [total, setTotal] = useState(0);

   const [alert, setAlert] = useState(null);
   const hideAlert = () => {
      setAlert(null);
      navigate("/profile");
      cartDispatch({
         type: "EMPTY_CART",
      });
   };
   const showAlert = () => {
      setAlert(<p>Order Success!</p>);
   };

   useEffect(() => {
      let tmpQty = 0;
      let tmpPrice = 0;

      cartState.carts.map((cart) => {
         tmpQty = tmpQty + cart.qty;
         tmpPrice = tmpPrice + cart.price * cart.qty;
      });

      setQuantity(tmpQty);
      setPrice(tmpPrice);
      setTotal(tmpPrice + delivery);
   }, [cartState.carts]);

   const handleOrder = async () => {
      const products = {
         partnerId: cartState.currentRestaurant.id,
         products: [
            ...cartState.carts.map((cart) => ({
               id: cart.id,
               qty: cart.qty,
            })),
         ],
      };
      setAuthToken(localStorage.token);
      const response = await API.post("/transaction", products);
      response?.data?.status === "Success!" && showAlert();
   };

   if (!userState.isLogin) {
      navigate("/");
      return null;
   }

   return (
      <>
         {cartState.carts.length == 0 ? (
            <>
               <h2>Look's Like Your Cart is Empty!</h2>
            </>
         ) : (
            <div className={styles.container}>
               <form className={styles.formContainer}>
                  <h1 className={styles.restaurantName}>Restaurant Name</h1>
                  <label className={styles.label} htmlFor="location">
                     Delivery Location
                  </label>
                  <div className={styles.deliveryLocation}>
                     <input className={styles.inputLocation} type="text" placeholder="Search Location" />
                     <MapsPopUp show={show} handleClose={() => setShow(false)} />
                     <button onClick={handleShowMaps} className={styles.btnSelectMap}>
                        Select On Map
                        <img style={{ marginLeft: "15px" }} src={map} alt="map" />
                     </button>
                  </div>
                  <label className={styles.label} htmlFor="review">
                     Review Your Order
                  </label>
                  <div className={styles.reviewOrder}>
                     <div className={styles.productInfo}>
                        <hr />
                        <div className={styles.productText}>
                           <img className={styles.imgProduct} src={paketGeprek} alt="Paket Geprek" />
                           <h5>Paket Geprek</h5>
                        </div>
                        <div className={styles.moreInfo}>
                           <p>Rp.15.000,-</p>
                           <img className={styles.bin} src={bin} alt="delete" />
                        </div>
                     </div>
                     <div className={styles.bill}>
                        <hr />
                        <div>
                           <label htmlFor="subtotal">Subtotal</label>
                           <p>Rp.15.000,-</p>
                        </div>
                        <div>
                           <label htmlFor="qty">QTY</label>
                           <p>2</p>
                        </div>
                        <div>
                           <label htmlFor="ongkir">Ongkir</label>
                           <p>Rp.10.000,-</p>
                           <hr />
                        </div>
                        <div>
                           <label htmlFor="total">Total</label>
                           <p>Rp.40.000,-</p>
                        </div>
                        <div>
                           <button className={styles.btnOrder}>Order</button>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         )}
         {alert}
      </>
   );
}
