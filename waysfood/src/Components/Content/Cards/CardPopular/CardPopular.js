import { BrowserRouter as Router, Link } from "react-router-dom";
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
          <img
            className={styles.merchantLogo}
            src={starbucks}
            alt="starbucks"
          />
          <p className={styles.merchantLabel}>Starbucks</p>
        </div>
        <div className={styles.merchant}>
          <img
            className={styles.merchantLogo}
            src={burgerking}
            alt="burgerking"
          />
          <p className={styles.merchantLabel}>Burger King</p>
        </div>
        <div className={styles.merchant}>
          <img className={styles.merchantLogo} src={kfc} alt="kfc" />
          <p className={styles.merchantLabel}>KFC</p>
        </div>
        <div className={styles.merchant}>
          <img className={styles.merchantLogo} src={jco} alt="jco" />
          <p className={styles.merchantLabel}>JCO</p>
        </div>
      </div>
    </>
  );
}
