import React from "react";

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
                  <a href="/income">
                     <button className={styles.btnCard}>Income Transaction</button>
                  </a>
               </div>
               <div className={styles.cardMenus}>
                  <img className={styles.imgCard} src={editProfile} alt="Edit Profile" />
                  <a href="/edit-profile">
                     <button className={styles.btnCard}>Edit Profile</button>
                  </a>
               </div>
               <div className={styles.cardMenus}>
                  <img className={styles.imgCard} src={income} alt="Income Transaction" />
                  <a href="/profile-partner">
                     <button className={styles.btnCard}>Profile</button>
                  </a>
               </div>
               <div className={styles.cardMenus}>
                  <img className={styles.imgCard} src={income} alt="Income Transaction" />
                  <a href="/add-product">
                     <button className={styles.btnCard}>Add Product</button>
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
}
