import React from "react";

import styles from "./RestaurantMenu.module.css";
import CardMenu from "../../../Components/Content/Cards/CardMenu/CardMenu";

export default function RestaurantMenu() {
   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Geprek Bensu, Menus</h1>
         <div className={styles.content}>
            <CardMenu />
            <br />
            <CardMenu />
         </div>
      </div>
   );
}
