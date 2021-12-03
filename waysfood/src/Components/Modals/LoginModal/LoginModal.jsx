import React, { useState, useContext } from "react";

import { AppContext } from "../../../Contex/UserContex";

import { Modal } from "react-bootstrap";

import styles from "./LoginModal.module.css";

function LoginModal({ show, handleClose, reg }) {
   // const {handleClose, show} = props;
   const [state, dispatch] = useContext(AppContext);

   const dataUser = JSON.parse(localStorage.getItem("User"));
   console.log(dataUser);

   // const [form, setData] = useState({
   //   isLogin: false,
   //   email: "",
   //   password: "",
   //   status: "",
   // });

   const [form, setForm] = useState({
      email: "",
      password: "",
   });

   const toSwitch = () => {
      handleClose();
      reg();
   };

   const handleOnSubmit = (e) => {
      e.preventDefault();
      const data = dataUser.find((item) => item.email === form.email && item.password === form.password);
      // console.log(data);
      if (data) {
         dispatch({
            type: "LOGIN_SUCCESS",
            payload: data,
         });
      }
   };

   const handleChange = (e) => {
      // e.preventDefault();
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <div>
         <Modal className="modal" show={show} onHide={handleClose}>
            <form onSubmit={handleOnSubmit} className={styles.formContainer}>
               <h2 className={styles.formLabel}>Login</h2>
               <div>
                  <input
                     onChange={handleChange}
                     className={styles.formInput}
                     name="email"
                     type="email"
                     id="email"
                     placeholder="Email"
                  />
               </div>
               <div>
                  <input
                     onChange={handleChange}
                     name="password"
                     type="password"
                     className={styles.formInput}
                     id="password"
                     placeholder="Password"
                  />
               </div>
               <div>
                  <button className={styles.btnLogin} type="submit">
                     Login
                  </button>
                  <p className={styles.formText}>
                     Don't have an account ? Click{" "}
                     <b onClick={toSwitch} className={styles.formTextBold}>
                        Here
                     </b>
                  </p>
               </div>
            </form>
         </Modal>
      </div>
   );
}

export default LoginModal;
