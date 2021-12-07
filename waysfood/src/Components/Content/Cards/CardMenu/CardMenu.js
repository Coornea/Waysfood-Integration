import React from "react";
import { Link } from "react-router-dom";

import styles from "./CardMenu.module.css";

import paketGeprek from "../../../../Assets/paket-geprek.jpg";
import nasiGorengRony from "../../../../Assets/nasi-goreng-mas-rony.jpg";
import pecelAyam from "../../../../Assets/pecel-ayam-prambanan.jpg";
import kopiKenangan from "../../../../Assets/kopi-kenangan.jpg";

export default function CardMenu() {
   return (
      <>
         <div className={styles.contentOther}>
            <div className={styles.menuContainer}>
               <div className={styles.menu}>
                  <Link to="/product/:id">
                     <img className={styles.menuPreview} src={paketGeprek} alt="Paket Geprek" />
                  </Link>

                  <div className={styles.menuText}>
                     <h3 style={{ fontSize: "14pt" }}>Paket Geprek</h3>
                     <p className={styles.price}>Rp.15.000,-</p>
                     <button className={styles.btnOrder}>Order</button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
