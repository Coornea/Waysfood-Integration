import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardRecommend.module.css";

import paketGeprek from "../../../../Assets/paket-geprek.jpg";
import nasiGorengRony from "../../../../Assets/nasi-goreng-mas-rony.jpg";
import pecelAyam from "../../../../Assets/pecel-ayam-prambanan.jpg";
import kopiKenangan from "../../../../Assets/kopi-kenangan.jpg";

export default function CardRecommend() {
   return (
      <>
         <div className={styles.contentOther}>
            <div className={styles.recommendContainer}>
               <div className={styles.recommend}>
                  <Link to="/restaurant-menu">
                     <img className={styles.recommendPreview} src={paketGeprek} alt="Paket Geprek" />{" "}
                  </Link>
                  <div className={styles.recommendText}>
                     <h3 style={{ fontSize: "14pt" }}>Paket Geprek</h3>
                     <p>0.1 KM</p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
