import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "./Contex/UserContex";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";

import {
   // BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
// import PrivateRoute from "./Components/Routes/PrivateRoute";

import User from "./Data/User.json";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Map from "./Components/Modals/MapsPopUp/MapsPopUp";

import HomePages from "./Pages/Home/HomePages";
import NotFound from "./Pages/NotFound/NotFound";

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

function App() {
   const [state, dispatch] = useContext(AppContext);
   console.log(state.isLogin);

   useEffect(() => {
      localStorage.setItem("User", JSON.stringify(User));
   }, []);

   useEffect(() => {
      if (localStorage.login) {
         dispatch({
            type: "CHECK_AUTH",
         });
      }
   }, []);

   //Guest
   // const GuestPage = (props) => {
   //   const { logout } = props;
   // };

   // Private
   // const PrivatePage = (props) => {
   //   const { login } = props;
   // };

   // const [isLogin, setIsLogin] = useState(false);

   return (
      <>
         <Navbar />
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
         {/* <Footer /> */}
      </>
   );
}

export default App;
