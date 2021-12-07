import React, { useState, useContext } from "react";

// Import useMutation from react-query
import { useMutation } from "react-query";

// Get API config
import { API } from "../../../Config/API";
import { UserContext } from "../../../Context/UserContext";

import { Modal, Alert } from "react-bootstrap";

import styles from "./RegisterModal.module.css";

export default function RegisterModal({ showReg, handleCloseReg, login }) {
   const title = "Register";
   document.title = "Waysfood | " + title;

   let api = API();
   // const [state, dispatch] = useContext(UserContext);
   const [message, setMessage] = useState(null);

   const [form, setForm] = useState({
      email: "",
      password: "",
      fullName: "",
      gender: "",
      phone: "",
      role: "",
   });

   const { email, password, fullName, gender, phone, role } = form;

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
         const response = await api.post("/register", config);

         // Notification
         if (response.status == "success") {
            const alert = (
               <Alert variant="success" className="py-1">
                  Success
               </Alert>
            );
            setMessage(alert);
            setForm({
               email: "",
               password: "",
               fullName: "",
               gender: "",
               phone: "",
               role: "",
            });
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

   // const dataUser = JSON.parse(localStorage.getItem("dataUser"));
   // const [data, setData] = useState({
   //    id: "",
   //    image: "",
   //    email: "",
   //    password: "",
   //    fullname: "",
   //    gender: "",
   //    phone: "",
   //    status: "",
   //    order: [],
   // });

   const toSwitch = () => {
      handleCloseReg();
      login();
   };

   // const handleOnSubmit = (e) => {
   //    e.preventDefault();
   //    data.id = Object.keys(dataUser).length + 1;
   //    dataUser.push(data);
   //    console.log(dataUser);
   //    localStorage.setItem("dataUser", JSON.stringify(dataUser));
   //    handleCloseReg();
   // };

   // const handleChange = (e) => {
   //    e.preventDefault();
   //    setData({
   //       ...data,
   //       id: "",
   //       image: "",
   //       [e.target.name]: e.target.value,
   //       fullname: "",
   //       gender: "",
   //       phone: "",
   //       status: "",
   //       order: [],
   //    });
   // };

   return (
      <div>
         <Modal className="modal" show={showReg} onHide={handleCloseReg}>
            {message && message}
            <form onSubmit={(e) => handleSubmit.mutate(e)} className={styles.formContainer}>
               <h2 className={styles.formLabel}>Register</h2>
               <div>
                  <input
                     onChange={handleChange}
                     className={styles.formInput}
                     type="email"
                     id="email"
                     name="email"
                     placeholder="Email"
                     value={email}
                  />
               </div>
               <div>
                  <input
                     onChange={handleChange}
                     type="password"
                     className={styles.formInput}
                     id="password"
                     name="password"
                     placeholder="Password"
                     value={password}
                  />
               </div>
               <div>
                  <input
                     onChange={handleChange}
                     type="text"
                     className={styles.formInput}
                     id="name"
                     name="fullName"
                     placeholder="Full Name"
                     value={fullName}
                  />
               </div>
               <div>
                  <input
                     onChange={handleChange}
                     type="gender"
                     className={styles.formInput}
                     id="gender"
                     name="gender"
                     placeholder="Gender"
                     value={gender}
                  />
               </div>
               <div>
                  <input
                     onChange={handleChange}
                     type="text"
                     className={styles.formInput}
                     id="phone"
                     name="phone"
                     placeholder="Phone Number"
                     value={phone}
                  />
               </div>
               <div>
                  <select onChange={handleChange} className={styles.formInput} id="role" name="role">
                     <option value="As User">As User</option>
                     <option value="Partner">Partner</option>
                     <option value="Customer">Customer</option>
                  </select>
               </div>
               <div>
                  <button className={styles.btnRegister} type="submit">
                     Register
                  </button>
                  <p className={styles.formText}>
                     Already have an account ? Click{" "}
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
