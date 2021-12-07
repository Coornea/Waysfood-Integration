import React from "react";
import { Link } from "react-router-dom";

import styles from "./LandingPartner.module.css";
import income from "../../../Assets/png/income.png";
import editProfile from "../../../Assets/png/edit-profile.png";

export default function LandingPartner() {
   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <h2 className={styles.title}>Welcome Partner</h2>
            <div className={styles.cardContainer}>
               <div className={styles.cardMenus}>
                  <img className={styles.imgCard} src={income} alt="Income Transaction" />
                  <Link to="/income">
                     <button className={styles.btnCard}>Income Transaction</button>
                  </Link>
               </div>
               <div className={styles.cardMenus}>
                  <img className={styles.imgCard} src={editProfile} alt="Edit Profile" />
                  <Link to="/edit-profile-partner">
                     <button className={styles.btnCard}>Edit Profile</button>
                  </Link>
               </div>
               <div className={styles.cardMenus}>
                  <img className={styles.imgCard} src={income} alt="Income Transaction" />
                  <Link to="/profile-partner">
                     <button className={styles.btnCard}>Profile</button>
                  </Link>
               </div>
               <div className={styles.cardMenus}>
                  <img className={styles.imgCard} src={income} alt="Income Transaction" />
                  <Link to="/add-product">
                     <button className={styles.btnCard}>Add Product</button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
