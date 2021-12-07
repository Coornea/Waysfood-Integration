import React from "react";

import { Link } from "react-router-dom";
import styles from "./CardPopular.module.css";

import starbucks from "../../../../Assets/png/starbucks.png";
import burgerking from "../../../../Assets/png/burgerking.png";
import kfc from "../../../../Assets/png/kfc.png";
import jco from "../../../../Assets/png/j.co.png";

export default function CardPopular() {
   return (
      <>
         <div className={styles.merchantContainer}>
            <div className={styles.merchant}>
               <Link to="/restaurant/:id">
                  <img className={styles.merchantLogo} src={starbucks} alt="starbucks" />
               </Link>
               <p className={styles.merchantLabel}>Starbucks</p>
            </div>
         </div>
      </>
   );
}
