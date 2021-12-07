import React, { useState } from "react";
import RegisterModal from "../Modals/RegisterModal/RegisterModal";

// Import useMutation from react-query
import { useMutation } from "react-query";

// Get API config
import { API } from "../../Config/API";

export default function Register() {
   const title = "Register";
   document.title = "Waysfood | " + title;

   const [state, dispatch] = useContext(UserContext);

   let navigate = useNavigate();

   // Create variable
   let api = API();

   // Create variable for store data with useState
   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
   });

   const { name, email, password } = form;

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

         // Configuration Content-type
         const config = {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: body,
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
               name: "",
               email: "",
               password: "",
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

   // const login = () => {
   //    dispatch({
   //       type: "LOGIN_SUCCESS",
   //       payload: {
   //          id: "",
   //          fullName: "",
   //          email: "",
   //          phone: "",
   //          gender: "",
   //          location: "",
   //          role: "",
   //       },
   //    });
   //    navigate("/");
   // };

   return (
      <div>
         <RegisterModal />
      </div>
   );
}
