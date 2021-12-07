import React, { useContext, useState, useEffect } from "react";

import { Nav, Navbar, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

// State Management
import { UserContext } from "../../Context/UserContext";

// Components
import ButtonProfile from "./ButtonProfile";
import NavButton from "./NavButton";

// SVGs
import brandLogo from "../../Assets/svg/waysfood.svg";

export default function Header({ handleShowLogin, handleShowRegister }) {
   const { state: userState, dispatch: userDispatch } = useContext(UserContext);

   return (
      <Navbar bg="warning" variant="light">
         <Container fluid className="px-3">
            <Navbar.Brand as={Link} to="/" className="brand-text font-weight-bold">
               <img src={brandLogo} alt="brandLogo" height="40" className="ml-2" />
            </Navbar.Brand>
            <Nav className="mr-auto"></Nav>

            {/* {userState.loading ? ( */}
            <></>
            {/* ) : userState.isLogin ? ( */}
            <ButtonProfile />
            {/* ) : ( */}
            <NavButton handleShowLogin={handleShowLogin} handleShowRegister={handleShowRegister} />
            {/* )} */}
         </Container>
      </Navbar>
   );
}
