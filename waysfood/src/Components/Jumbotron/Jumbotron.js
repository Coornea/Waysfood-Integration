import React from "react";

import styles from "./Jumbotron.module.css";

import pizza from "../../Assets/png/pizza-icon.png";

export default function Jumbotron() {
   return (
      <>
         <div className={styles.jumbotron}>
            <div className={styles.jumbotronContainer}>
               <h1 className={styles.jumbotronTitle}>
                  Are You Hungry ?<br />
                  Express Home Delivery
               </h1>
               <div className={styles.lineGroup}>
                  <div className={styles.line}></div>
                  <p className={styles.jumbotronText}>
                     Mollit eu aliqua anim sint tempor voluptate ad minim commodo in esse exercitation.
                     Adipisicing anim aliquip et. Ut nostrud officia laborum id.
                  </p>
               </div>
            </div>
            <img className={styles.pizza} src={pizza} alt="pizza-icon" />
         </div>
      </>
   );
}
