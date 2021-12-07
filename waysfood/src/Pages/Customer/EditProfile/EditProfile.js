import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MapsPopUp from "../../../Components/Modals/MapsPopUp/MapsPopUp";

import styles from "./EditProfile.module.css";
import pin from "../../../Assets/png/pin.png";
import map from "../../../Assets/png/map.png";

export default function EditProfile() {
   const [Maps, setMaps] = useState(false);
   const handleShowMaps = (e) => {
      e.preventDefault();
      setMaps(true);
   };

   const navigate = useNavigate();
   const onClicked = () => {
      navigate("/profile");
   };

   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <h2>Edit Profile</h2>
            <form className={styles.formContainer} action="">
               <div className={styles.sectionOne}>
                  <input className={styles.formInput} type="text" placeholder="Full Name" />
                  <div className={styles.btnAttach}>
                     <label className={styles.labelAttach} htmlFor="attachImage">
                        <p>Attach Image</p> <img className={styles.imgPin} src={pin} />
                     </label>
                     <input hidden type="file" id="attachImage" />
                  </div>
               </div>
               <input className={styles.formInput} type="email" placeholder="Email" />
               <br />
               <input className={styles.formInput} type="text" placeholder="Phone" />
               <div className={styles.sectionTwo}>
                  <input className={styles.formInput} type="text" placeholder="Location" />
                  <MapsPopUp show={Maps} handleClose={() => setMaps(false)} />
                  <button onClick={handleShowMaps} className={styles.btnSelectMap}>
                     Select On Map
                     <img style={{ marginLeft: "15px" }} src={map} alt="map" />
                  </button>
               </div>
               <div className={styles.btnWrap}>
                  <button onClick={onClicked} className={styles.btnSave}>
                     Save
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
