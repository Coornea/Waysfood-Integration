import React, { useState, useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { AnimatePresence } from "framer-motion";

// State Management
import { CartContextProvider } from "./Context/CartContext";
import { UserContext } from "./Context/UserContext";
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
// Components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Map from "./Components/Modals/MapsPopUp/MapsPopUp";
import HomePages from "./Pages/Home/HomePages";
import NotFound from "./Pages/NotFound/NotFound";
// Components 2
// import LoginModal from "./Components/Modals/LoginModal";
// import RegisterModal from "./Components/Modals/RegisterModal";
// import LandingPage from "./components/pages/LandingPage";
import Header from "./Components/Reusable/Header";
// import DetailProductPage from "./components/pages/DetailProductPage";
// import CartPage from "./components/pages/CartPage";
// import ProfilePage from "./components/pages/ProfilePage";
// import AddProductPage from "./components/pages/AddProductPage";
// import IncomePage from "./components/pages/IncomePage";
// import EditProfilePage from "./components/pages/EditProfilePage";
// import PrivateRoute from "./components/routes/PrivateRoute";

// Customer Part
import Profile from "./Pages/Customer/Profile/Profile";
import EditProfile from "./Pages/Customer/EditProfile/EditProfile";
import CartPage from "./Pages/Customer/CartPage/CartPage";
import RestaurantMenu from "./Pages/Customer/RestaurantMenu/RestaurantMenu";
// Partner Part
import LandingPartner from "./Pages/Partner/LandingPartner/LandingPartner";
import ProfilePartner from "./Pages/Partner/ProfilePartner/ProfilePartner";
import EditProfilePartner from "./Pages/Partner/EditProfilePartner/EditProfilePartner";
import AddProduct from "./Pages/Partner/AddProduct/AddProduct";
import IncomeTransaction from "./Pages/Partner/IncomeTransaction/IncomeTransaction";
// Admin Part
import LandingAdmin from "./Pages/Admin/LandingAdmin/LandingAdmin";
// API
import { setAuthToken, API } from "./Config/API";

if (localStorage.token) {
   setAuthToken(localStorage.token);
}

function App() {
   const location = useLocation();

   const { state: userState, dispatch: userDispatch } = useContext(UserContext);

   // Login Modal
   const [showLogin, setShowLogin] = useState(false);
   const handleCloseLogin = () => setShowLogin(false);
   const handleShowLogin = () => setShowLogin(true);

   // Register Modal
   const [showRegister, setShowRegister] = useState(false);
   const handleCloseRegister = () => setShowRegister(false);
   const handleShowRegister = () => setShowRegister(true);

   const checkCustomer = async () => {
      try {
         const response = await API.get("/check-auth");

         if (response.status === 401) {
            return userDispatch({
               type: "AUTH_ERROR",
            });
         }

         let payload = response?.data?.data?.user;
         payload.token = localStorage.token;

         userDispatch({
            type: "LOGIN_SUCCESS",
            payload,
         });
      } catch (error) {
         console.log(error);
         userDispatch({
            type: "AUTH_ERROR",
         });
      }
   };

   useEffect(() => {
      checkCustomer();
   }, []);

   const client = new QueryClient();

   return (
      <>
         <QueryClientProvider client={client}>
            <CartContextProvider>
               <Header handleShowLogin={handleShowLogin} handleShowRegister={handleShowRegister} />{" "}
               <AnimatePresence exitBeforeEnter>
                  <Routes>
                     <Route exact path="/" element={<HomePages />} />
                     <Route exact path="/profile" element={<Profile />} />
                     <Route exact path="/edit-profile" element={<EditProfile />} />
                     <Route exact path="/restaurant-menu" element={<RestaurantMenu />} />
                     <Route exact path="/cart-page" element={<CartPage />} />

                     <Route exact path="/landing-partner" element={<LandingPartner />} />
                     <Route exact path="/profile-partner" element={<ProfilePartner />} />
                     <Route exact path="/edit-profile-partner" element={<EditProfilePartner />} />
                     <Route exact path="/add-product" element={<AddProduct />} />
                     <Route exact path="/income" element={<IncomeTransaction />} />

                     <Route exact path="/admin" element={<LandingAdmin />} />

                     <Route exact path="/not-found" element={<NotFound />} />
                     <Route path="*" element={<Navigate to="/not-found" />} />

                     <Route exact path="/map" element={<Map />} />
                  </Routes>
               </AnimatePresence>
               {/* <LoginModal
                  handleCloseLogin={handleCloseLogin}
                  handleShowRegister={handleShowRegister}
                  showLogin={showLogin}
               />
               <RegisterModal
                  handleCloseRegister={handleCloseRegister}
                  handleShowLogin={handleShowLogin}
                  showRegister={showRegister}
               /> */}
            </CartContextProvider>
         </QueryClientProvider>
      </>
   );
}

export default App;
