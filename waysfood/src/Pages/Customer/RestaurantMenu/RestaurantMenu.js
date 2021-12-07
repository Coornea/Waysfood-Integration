import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { API } from "../../../Config/API";

import styles from "./RestaurantMenu.module.css";
import CardMenu from "../../../Components/Content/Cards/CardMenu/CardMenu";

export default function RestaurantMenu() {
   const { id } = useParams();

   const {
      data: RestaurantData,
      loading: restaurantLoading,
      error: restaurantError,
      refetch: restaurantRefetch,
   } = useQuery("restaurantCache", async () => {
      const response = await API.get(`/user/${id}`);
      console.log(response.data.data.user);
      return response;
   });

   const {
      data: dataMenu,
      loading: menuLoading,
      error: menuError,
      refetch: menuRefetch,
   } = useQuery("dataMenu", async () => {
      const response = await API.get(`/products/${id}`);
      return response;
   });

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>{RestaurantData?.data?.user?.fullName}, Menus</h1>
         <div className={styles.content}>
            {dataMenu?.data?.products?.map((menu) => (
               <CardMenu key={menu.id} data={menu} />
            ))}
         </div>
      </div>
   );
}
