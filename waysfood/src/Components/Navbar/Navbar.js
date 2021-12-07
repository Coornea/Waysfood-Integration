import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

// State Management
import { UserContext } from "../../Context/UserContext";

// Components
import ButtonProfile from "../Reusable/ButtonProfile";
import NavButton from "../Reusable/NavButton";

import styles from "./Navbar.module.css";
import logo from "../../Assets/png/waysfood.png";
import user1 from "../../Assets/user/user-1.jpg";
import cart from "../../Assets/png/cart.png";
import polygon from "../../Assets/png/polygon.png";

import RegisterModal from "../Modals/RegisterModal/RegisterModal";
import LoginModal from "../Modals/LoginModal/LoginModal";

function Navbar({ handleShowLogin, handleShowRegister }) {
   const { state: userState, dispatch: userDispatch } = useContext(UserContext);

   return (
      <div className={styles.navbar}>
         <Link to="/">
            <img className={styles.logo} src={logo} alt="waysfood-icon" />
         </Link>
         {/* <RegisterModal showReg={Register} handleCloseReg={() => setRegister(false)} /> */}
         {/* <LoginModal show={Login} handleClose={() => setLogin(false)} /> */}
         <div className={styles.wrap}>
            {userState.loading ? (
               <></>
            ) : userState.isLogin ? (
               <ButtonProfile />
            ) : (
               <NavButton handleShowLogin={handleShowLogin} handleShowRegister={handleShowRegister} />
            )}
         </div>
      </div>
   );
}

export default Navbar;
