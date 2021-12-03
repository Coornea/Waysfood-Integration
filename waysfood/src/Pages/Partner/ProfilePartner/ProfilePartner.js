import React from "react";

import styles from "./ProfilePartner.module.css";

import logo from "../../../Assets/png/waysfood.png";
import partner1 from "../../../Assets/paket-sambel-matah.jpg";

export default function ProfilePartner() {
   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <div className={styles.sectionOne}>
               <h2 className={styles.title}>My Profile</h2>
               <div className={styles.profileContainer}>
                  <div className={styles.profileView}>
                     <img
                        style={{ height: "200px" }}
                        className={styles.profileImage}
                        src={partner1}
                        alt="User"
                     />
                     <button className={styles.btnEdit}>Edit Profile</button>
                  </div>
                  <div className={styles.profileInfo}>
                     <label htmlFor="fullname">Full Name</label>
                     <p>Name</p>
                     <label htmlFor="email">Email</label>
                     <p>email@gmail.com</p>
                     <label htmlFor="phone">Phone</label>
                     <p>084999777888</p>
                  </div>
               </div>
            </div>
            <div className={styles.sectionTwo}>
               <h2 className={styles.title}>History Order</h2>
               <div className={styles.cardHistory}>
                  <div>
                     <label className={styles.label} htmlFor="restaurant">
                        Restaurant
                     </label>
                     <p>
                        <b>Saturday</b>, 12 March 2021
                     </p>
                     <p className={styles.price}>Total: Rp.50.000,-</p>
                  </div>
                  <div>
                     <img className={styles.logoHistory} src={logo} alt="waysfood" />
                     <p>Finished</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
