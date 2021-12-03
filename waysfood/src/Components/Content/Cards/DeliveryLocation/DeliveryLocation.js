import React from "react";

import styles from "./MyLocation.module.css";
import locationIcon from "../../../../Assets/png/location.png";

export default function MyLocation() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h4 className={styles.contentTitle}>Select delivery location</h4>
        <div className={styles.contentInfo}>
          <img
            className={styles.locationIcon}
            src={locationIcon}
            alt="maps-icon"
          />
          <div className={styles.detailedLocation}>
            <h5 className={styles.addressTitle}>Harbour Building</h5>
            <p className={styles.address}>
              Jl. Elang IV No. 48, Sawah Lama, Kec. Ciputat, Kota Tangerang
              Selatan, Banten 15413, Indonesia
            </p>
          </div>
        </div>
        <button className={styles.btnConfirm} type="submit">
          Confirm Location
        </button>
      </div>
    </div>
  );
}
