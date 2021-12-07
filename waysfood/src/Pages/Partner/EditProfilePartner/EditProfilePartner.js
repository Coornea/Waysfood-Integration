import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../../Context/UserContext";
import { API, setAuthToken } from "../../../Config/API";

import MapsPopUp from "../../../Components/Modals/MapsPopUp/MapsPopUp";

import styles from "./EditProfilePartner.module.css";
import pin from "../../../Assets/png/pin.png";
import map from "../../../Assets/png/map.png";

export default function EditProfilePartner() {
   const navigate = useNavigate();

   const { state: userState, dispatch: userDispatch } = useContext(UserContext);
   const [form, setForm] = useState({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      image: null,
   });

   const { id } = userState.loggedUser;
   const { fullName, email, password, phone, image } = form;

   // Load User Data
   const loadUserData = async () => {
      setAuthToken(localStorage.token);
      const response = await API.get(`/user/${id}`);
      const user = response.data.data.user;
      setForm({
         ...form,
         fullName: user.fullName,
         email: user.email,
      });
   };

   // Modal Handler
   const [show, setShow] = useState(false);
   const handleShowMaps = () => setShow(true);
   const handleCloseMaps = () => setShow(false);

   const addUser = useMutation(async () => {
      const body = new FormData();
      const location = `${userState.orderLocation.lng},${userState.orderLocation.lat}`;

      body.set("fullName", form.fullName);
      body.set("email", form.email);
      body.set("password", form.password);
      body.set("phone", form.phone);
      body.set("location", location);
      body.set("image", form.image);

      const config = {
         headers: {
            "Context-Type": "multipart/form-data",
         },
      };
      const response = await API.patch(`/user/${id}`, body, config);
      userDispatch({
         type: "EDIT_SUCCESS",
         payload: {
            ...response.data.data.user,
            token: localStorage.token,
         },
      });

      setForm({
         fullName: "",
         email: "",
         password: "",
         phone: "",
         image: null,
      });
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      addUser.mutate();
      !addUser?.error && navigate("/profile");
   };

   const handleChange = (e) => {
      const tempForm = { ...form };
      tempForm[e.target.name] = e.target.type === "file" ? e.target.files[0] : e.target.value;
      setForm(tempForm);
   };

   useEffect(() => {
      loadUserData();
   }, []);

   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <h2>Edit Profile{userState.loggedUser.role === "Partner"}</h2>
            <form onSubmit={handleSubmit} className={styles.formContainer} action="">
               <div className={styles.sectionOne}>
                  <input
                     name="fullName"
                     value={fullName}
                     onChange={(e) => handleChange(e)}
                     className={styles.formInput}
                     type="text"
                     placeholder="Name Partner"
                  />
                  <div className={styles.btnAttach}>
                     <label className={styles.labelAttach} htmlFor="attachImage">
                        <p>Attach Image</p> <img className={styles.imgPin} src={pin} />
                     </label>
                     <input hidden type="file" name="image" id="attachImage" />
                  </div>
               </div>
               <input
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                  className={styles.formInput}
                  type="email"
                  placeholder="Email"
               />
               <br />
               <input
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                  className={styles.formInput}
                  type="password"
                  placeholder="Password"
               />
               <br />
               <input
                  name="phone"
                  value={phone}
                  onChange={(e) => handleChange(e)}
                  className={styles.formInput}
                  type="text"
                  placeholder="Phone"
               />
               <div className={styles.sectionTwo}>
                  <input
                     name="location"
                     value={userState.orderLocation}
                     onChange={(e) => handleChange(e)}
                     className={styles.formInput}
                     type="text"
                     placeholder="Location"
                  />
                  <MapsPopUp show={show} handleClose={() => setShow(false)} />
                  <button onClick={handleShowMaps} className={styles.btnSelectMap}>
                     Select On Map
                     <img style={{ marginLeft: "15px" }} src={map} alt="map" />
                  </button>
               </div>
               <div className={styles.btnWrap}>
                  {/* <Link to="/profile-partner"> */}
                  <button className={styles.btnSave}>Save</button>
                  {/* </Link> */}
               </div>
            </form>
         </div>
      </div>
   );
}
