import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

// State Management
import { CartContext } from "../../../Context/CartContext";
import { UserContext } from "../../../Context/UserContext";

import { setAuthToken, API } from "../../../Config/API";

import styles from "./ProfilePartner.module.css";
// Components
import HistoryCard from "../../../Components/Content/Cards/HistoryCard";
import logo from "../../../Assets/png/waysfood.png";
import partner1 from "../../../Assets/paket-sambel-matah.jpg";

export default function ProfilePartner() {
   const { state: userState, dispatch: userDispatch } = useContext(UserContext);
   const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
   const { id, fullName, email, image, phone, role } = userState.loggedUser;

   // Temporary Data
   const [tempMenu, setTempMenu] = useState({});
   const {
      data: transactionsData,
      loading,
      error,
      refetch,
   } = useQuery("transactionsCache", async () => {
      setAuthToken(localStorage.token);
      const response = await API.get(role === "Partner" ? `/transactions/${id}` : `/my-transactions/${id}`);
      return response.data;
   });
   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <div className={styles.sectionOne}>
               <h2 className={styles.title}>My Profile</h2>
               <div className={styles.profileContainer}>
                  <div className={styles.profileView}>
                     <img
                        style={{ height: "200px" }}
                        className={styles.profileImage}
                        src={partner1}
                        alt="User"
                     />
                     <Link to="/edit-profile-partner">
                        <button className={styles.btnEdit}>Edit Profile</button>
                     </Link>
                  </div>
                  <div className={styles.profileInfo}>
                     <label htmlFor="fullname">Full Name</label>
                     <p>{fullName}</p>
                     <label htmlFor="email">Email</label>
                     <p>{email}</p>
                     <label htmlFor="phone">Phone</label>
                     <p>{phone}</p>
                  </div>
               </div>
            </div>
            <div className={styles.sectionTwo}>
               <h2 className={styles.title}>History {role === "Partner" ? "Order" : "Transaction"}</h2>
               <div className={styles.cardHistory}>
                  <div>
                     <label className={styles.label} htmlFor="restaurant">
                        Restaurant
                     </label>
                     {loading}
                     {/* {transactionsData?.data?.transactions?.map((trans, index))} */}
                     <HistoryCard
                        // key={trans.id}
                        // data={trans}
                        // handleMapDeliveryShow={handleMapDeliveryShow}
                        setTempMenu={setTempMenu}
                        // showAlert={showAlert}
                     />
                     <p>
                        <b>Saturday</b>, 12 March 2021
                     </p>
                     <p className={styles.price}>Total: Rp.50.000,-</p>
                  </div>
                  <div>
                     <img className={styles.logoHistory} src={logo} alt="waysfood" />
                     <p>Finished</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
