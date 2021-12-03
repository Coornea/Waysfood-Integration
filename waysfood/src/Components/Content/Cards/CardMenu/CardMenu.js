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
            <img
              className={styles.menuPreview}
              src={paketGeprek}
              alt="Paket Geprek"
            />
            <div className={styles.menuText}>
              <h3 style={{ fontSize: "14pt" }}>Paket Geprek</h3>
              <p className={styles.price}>Rp.15.000,-</p>
              <button className={styles.btnOrder}>Order</button>
            </div>
          </div>
          <div className={styles.menu}>
            <img
              className={styles.menuPreview}
              src={nasiGorengRony}
              alt="Nasi Goreng Mas Rony"
            />
            <div className={styles.menuText}>
              <h3 style={{ fontSize: "14pt" }}>Nasi Goreng Mas Rony</h3>
              <p className={styles.price}>Rp.25.000,-</p>
              <button className={styles.btnOrder}>Order</button>
            </div>
          </div>
          <div className={styles.menu}>
            <img
              className={styles.menuPreview}
              src={pecelAyam}
              alt="Pecel Ayam Prambanan"
            />
            <div className={styles.menuText}>
              <h3 style={{ fontSize: "14pt" }}>Pecel Ayam Prambanan</h3>
              <p className={styles.price}>Rp.17.000,-</p>
              <button className={styles.btnOrder}>Order</button>
            </div>
          </div>
          <div className={styles.menu}>
            <img
              className={styles.menuPreview}
              src={kopiKenangan}
              alt="Kopi Kenangan"
            />
            <div className={styles.menuText}>
              <h3 style={{ fontSize: "14pt" }}>Kopi Kenangan</h3>
              <p className={styles.price}>Rp.20.000,-</p>
              <button className={styles.btnOrder}>Order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
