import React from "react";

import styles from "./Dropdown.module.css";

import avatar from "../../Assets/user/user-1.jpg";
import profile from "../../Assets/png/user.png";
import cart from "../../Assets/png/cart.png";
import logout from "../../Assets/png/logout.png";

export default function Dropdown() {
   const toggleMenu = () => {
      // const menuToggle = document.querySelector(".menu");
      // menuToggle.classList.toggle("active");
   };
   return (
      <>
         <div className={styles.action}>
            <div onClick={toggleMenu()} className={styles.avatar}>
               <img src={avatar} alt="avatar" />
            </div>
            <div className={styles.menu}>
               <h3>
                  Status: <span>Status</span>
               </h3>
               <ul>
                  <li>
                     <a href="/profile">
                        <img src={profile} alt="profile" />
                        My Profile
                     </a>
                  </li>
                  <li>
                     <a href="/profile">
                        <img src={cart} alt="cart" />
                        Orders
                     </a>
                  </li>
                  <li>
                     <a href="/profile">
                        <img src={logout} alt="logout" />
                        Logout
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </>
   );
}
