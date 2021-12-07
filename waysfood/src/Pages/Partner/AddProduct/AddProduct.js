import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { UserContext } from "../../../Context/UserContext";

import { Alert } from "react-bootstrap";
import styles from "./AddProduct.module.css";
import pin from "../../../Assets/png/pin.png";

// Get API
import { API } from "../../../Config/API";

export default function AddProduct() {
   const titlepage = "Add Product";
   document.title = "Waysfood | " + titlepage;

   const navigate = useNavigate();
   const { state: userState, dispatch: userDispatch } = useContext(UserContext);

   // Create variable for store data with useState
   const [form, setForm] = useState({
      title: "",
      image: "",
      price: "",
      qty: "",
   });

   const [editId, setEditId] = useState(0);
   const { id } = userState.loggedUser;

   // Handle Modals
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [alert, setAlert] = useState(null);
   const hideAlert = () => {
      setAlert(null);
   };
   const showAlert = () => {
      setAlert(<Alert onClick={() => hideAlert()} />);
   };

   // Create function to handle insert data with useMutation
   const addProduct = useMutation(async () => {
      const body = new FormData();
      body.set("image", form?.image[0], form?.image);
      body.set("title", form.title);
      body.set("price", form.price);
      body.set("qty", form.qty);

      const config = {
         headers: {
            "Conten-Type": "multipart/form-data",
         },
      };

      const response =
         editId == 0
            ? await API.post("/product", body, config)
            : await API.patch(`/product${editId}`, body, config);
      response.data.status === "Success!" && showAlert();
      setForm({
         title: "",
         price: "",
         image: "",
         qty: "",
      });
      refetch();
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      addProduct.mutate();
      navigate("/product");
   };

   const {
      data: dataMenu,
      loading,
      error,
      refetch,
   } = useQuery("dataMenu", async () => {
      const response = await API.get(`/product/${id}`);
      return response;
   });

   const loadEachMenu = async () => {
      try {
         if (editId > 0) {
            const response = await API.get(`/product/${editId}`);
            const { title, price, qty } = response.data.data.product;
            setForm({
               ...form,
               title,
               price,
               qty,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   // Handle change data on form
   const handleChange = (e) => {
      const tempForm = { ...form };
      tempForm[e.target.name] = e.target.type === "file" ? e.target.files[0] : e.target.value;
      setForm(tempForm);
   };

   useEffect(() => {
      loadEachMenu();
   }, [editId]);

   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} className={styles.formContainer} action="">
               <div className={styles.sectionOne}>
                  <input
                     onChange={(e) => handleChange(e)}
                     className={styles.formInput}
                     type="text"
                     name="title"
                     placeholder="Title"
                     value={form.title}
                  />
                  <div className={styles.btnAttach}>
                     <label className={styles.labelAttach} htmlFor="attachImage">
                        <p>Attach Image</p> <img className={styles.imgPin} src={pin} />
                     </label>
                     <input name="image" onChange={handleChange} hidden type="file" id="attachImage" />
                  </div>
               </div>
               <input
                  onChange={(e) => handleChange(e)}
                  className={styles.formInput}
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={form.price}
               />
               <input
                  onChange={(e) => handleChange(e)}
                  className={styles.formInput}
                  name="qty"
                  type="number"
                  placeholder="Quantity"
                  value={form.qty}
               />
               <div className={styles.btnWrap}>
                  <button type="submit" className={styles.btnSave}>
                     Add Product
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
