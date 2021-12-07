import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { Modal, Alert } from "react-bootstrap";
import styles from "./LoginModal.module.css";

import { UserContext } from "../../../Context/UserContext";
import { API } from "../../../Config/API";

function LoginModal({ show, handleClose, reg }) {
   const [state, dispatch] = useContext(UserContext);
   const title = "Login";
   document.title = "Waysfood | " + title;

   const navigate = useNavigate();

   let api = API();
   // const [state, dispatch] = useContext(UserContext);
   const [message, setMessage] = useState(null);

   const [form, setForm] = useState({
      email: "",
      password: "",
   });

   const { email, password } = form;

   const handleChange = (e) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };

   // Create function to handle insert data process with useMutation
   const handleSubmit = useMutation(async (e) => {
      try {
         e.preventDefault();

         // Data body
         const body = JSON.stringify(form);
         // console.log(form);

         // Configuration Content-type
         const config = {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body,
         };

         // Insert data user to database
         const response = await api.post("login", config);

         // Notification
         if (response.status == "Success!") {
            // Add dispatch and condition
            dispatch({
               type: "LOGIN_SUCCESS",
               payload: response.data,
            });
            console.log(response.data);
            if (response.data.user.role === "Partner") {
               navigate("/landing-partner");
            } else {
               navigate("/profile");
            }
         } else {
            const alert = (
               <Alert variant="danger" className="py-1">
                  Failed
               </Alert>
            );
            setMessage(alert);
         }
      } catch (error) {
         const alert = (
            <Alert variant="danger" className="py-1">
               Failed
            </Alert>
         );
         setMessage(alert);
         console.log(error);
      }
   });

   // const {handleClose, show} = props;

   // const dataUser = JSON.parse(localStorage.getItem("User"));
   // console.log(dataUser);

   // const [form, setData] = useState({
   //   isLogin: false,
   //   email: "",
   //   password: "",
   //   status: "",
   // });

   // const [form, setForm] = useState({
   //    email: "",
   //    password: "",
   // });

   // const toSwitch = () => {
   //    handleClose();
   //    reg();
   // };

   // const handleOnSubmit = (e) => {
   //    e.preventDefault();
   //    const data = dataUser.find((item) => item.email === form.email && item.password === form.password);
   //    // console.log(data);
   //    if (data) {
   //       dispatch({
   //          type: "LOGIN_SUCCESS",
   //          payload: data,
   //       });
   //    }
   // };

   // const handleChange = (e) => {
   //    // e.preventDefault();
   //    setForm({
   //       ...form,
   //       [e.target.name]: e.target.value,
   //    });
   // };

   return (
      <div>
         <Modal className="modal" show={show} onHide={handleClose}>
            <form onSubmit={(e) => handleSubmit.mutate(e)} className={styles.formContainer}>
               <h2 className={styles.formLabel}>Login</h2>
               <div>
                  <input
                     onChange={handleChange}
                     className={styles.formInput}
                     name="email"
                     type="email"
                     id="email"
                     placeholder="Email"
                     value={email}
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
                     value={password}
                  />
               </div>
               <div>
                  <button className={styles.btnLogin} type="submit">
                     Login
                  </button>
                  <p className={styles.formText}>
                     Don't have an account ? Click{" "}
                     {/* <b onClick={toSwitch} className={styles.formTextBold}> */}
                     Here
                     {/* </b> */}
                  </p>
               </div>
            </form>
         </Modal>
      </div>
   );
}

export default LoginModal;
