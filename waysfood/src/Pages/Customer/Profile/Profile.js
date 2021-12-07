import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";

import logo from "../../../Assets/png/waysfood.png";
import user1 from "../../../Assets/user/user-1.jpg";

export default function Profile() {
   const navigate = useNavigate();
   const goEdit = () => {
      navigate("/edit-profile");
   };

   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <div className={styles.sectionOne}>
               <h2 className={styles.title}>My Profile</h2>
               <div className={styles.profileContainer}>
                  <div className={styles.profileView}>
                     <img className={styles.profileImage} src={user1} alt="User" />
                     <button onClick={goEdit} className={styles.btnEdit}>
                        Edit Profile
                     </button>
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
               <h2 className={styles.title}>History Transaction</h2>
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
