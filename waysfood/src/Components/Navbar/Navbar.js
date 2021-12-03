import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Contex/UserContex";
// import DropdownCustomer from "../Dropdown/DropdownCustomer";
import Dropdown from "../Dropdown/Dropdown";

import styles from "./Navbar.module.css";
import logo from "../../Assets/png/waysfood.png";
import user1 from "../../Assets/user/user-1.jpg";
import cart from "../../Assets/png/cart.png";
import polygon from "../../Assets/png/polygon.png";

import RegisterModal from "../Modals/RegisterModal/RegisterModal";
import LoginModal from "../Modals/LoginModal/LoginModal";

function Navbar() {
   // const navItems = ['',];
   const [Login, setLogin] = useState(false);
   const handleShow = () => {
      setLogin(true);
   };

   const [Register, setRegister] = useState(false);
   const handleShowReg = () => {
      setRegister(true);
   };

   const [dropdown, setDropdown] = useState(false);
   const handleShowDropdown = () => setDropdown(true);
   console.log(dropdown);

   const [state, dispatch] = useContext(AppContext);

   return (
      <div className={styles.navbar}>
         <a href="/">
            <img className={styles.logo} src={logo} alt="waysfood-icon" />
         </a>
         <RegisterModal showReg={Register} handleCloseReg={() => setRegister(false)} />
         <LoginModal show={Login} handleClose={() => setLogin(false)} />
         <div className={styles.wrap}>
            {state.isLogin ? (
               state.user.role != "partner" ? (
                  <>
                     <Dropdown />
                     {/* <div className={styles.navIcon}>
                        <div className={styles.avatarContainer}>
                           <div className={styles.avatarWrap}>
                              <img
                                 onClick={handleShowDropdown}
                                 src={user1}
                                 alt="User"
                                 className={styles.avatar}
                              />
                           </div>
                           <img src={polygon} alt="polygon" className={styles.polygon} />
                        </div>
                     </div> */}
                  </>
               ) : (
                  <>
                     {/* <div className={styles.navIcon}>
                        <div className={styles.avatarContainer}>
                           <a href="/cart-page">
                              <img src={cart} alt="cart-icon" className={styles.cartIcon} />
                           </a>
                           <div className={styles.avatarWrap}>
                              <img
                                 onClick={handleShowDropdown}
                                 src={user1}
                                 alt="User"
                                 className={styles.avatar}
                              />
                           </div>
                           <img src={polygon} alt="polygon" className={styles.polygon} />
                        </div>
                     </div> */}
                  </>
               )
            ) : (
               <>
                  <button onClick={handleShowReg} className={styles.btnRegister}>
                     Register
                  </button>
                  <button onClick={handleShow} className={styles.btnLogin}>
                     Login
                  </button>
               </>
            )}
         </div>
         {/* <DropdownCustomer show={dropdown} hide={() => setDropdown(false)} /> */}
      </div>
   );
}

export default Navbar;
