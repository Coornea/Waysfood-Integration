import { useState } from "react";

import styles from "./CartPage.module.css";
import MapsPopUp from "../../../Components/Modals/MapsPopUp/MapsPopUp";

import bin from "../../../Assets/png/bin.png";
import paketGeprek from "../../../Assets/paket-geprek.jpg";
import map from "../../../Assets/png/map.png";

export default function CartPage() {
   const [Maps, setMaps] = useState(false);
   const handleShowMaps = (e) => {
      e.preventDefault();
      setMaps(true);
   };

   return (
      <div className={styles.container}>
         <form className={styles.formContainer}>
            <h1 className={styles.restaurantName}>Restaurant Name</h1>
            <label className={styles.label} htmlFor="location">
               Delivery Location
            </label>
            <div className={styles.deliveryLocation}>
               <input className={styles.inputLocation} type="text" placeholder="Search Location" />
               <MapsPopUp show={Maps} handleClose={() => setMaps(false)} />
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
   );
}
