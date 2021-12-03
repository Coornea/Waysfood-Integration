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
                  <a href="/restaurant-menu">
                     <img className={styles.recommendPreview} src={paketGeprek} alt="Paket Geprek" />
                  </a>
                  <div className={styles.recommendText}>
                     <h3 style={{ fontSize: "14pt" }}>Paket Geprek</h3>
                     <p>0.1 KM</p>
                  </div>
               </div>
               <div className={styles.recommend}>
                  <a href="/restaurant-menu">
                     <img
                        className={styles.recommendPreview}
                        src={nasiGorengRony}
                        alt="Nasi Goreng Mas Rony"
                     />
                  </a>
                  <div className={styles.recommendText}>
                     <h3 style={{ fontSize: "14pt" }}>Nasi Goreng Mas Rony</h3>
                     <p>0.2 KM</p>
                  </div>
               </div>
               <div className={styles.recommend}>
                  <img className={styles.recommendPreview} src={pecelAyam} alt="Pecel Ayam Prambanan" />
                  <div className={styles.recommendText}>
                     <h3 style={{ fontSize: "14pt" }}>Pecel Ayam Prambanan</h3>
                     <p>0.4 KM</p>
                  </div>
               </div>
               <div className={styles.recommend}>
                  <img className={styles.recommendPreview} src={kopiKenangan} alt="Kopi Kenangan" />
                  <div className={styles.recommendText}>
                     <h3 style={{ fontSize: "14pt" }}>Kopi Kenangan</h3>
                     <p>0.8 KM</p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
