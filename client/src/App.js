import { useState, useEffect } from "react";

import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// State Management
import { UserContextProvider } from "./contexts/userContext";
import { CartContextProvider } from "./contexts/cartContext";

// Components
import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";
import LandingPage from "./components/pages/LandingPage";
import Header from "./components/reusable/Header";
import DetailProductPage from "./components/pages/DetailProductPage";
import CartPage from "./components/pages/CartPage";
import ProfilePage from "./components/pages/ProfilePage";
import AddProductPage from "./components/pages/AddProductPage";
import IncomePage from "./components/pages/IncomePage";
import EditProfilePage from "./components/pages/EditProfilePage";
import PrivateRoute from "./components/routes/PrivateRoute";

function App() {
  const location = useLocation();
  // Login modal stuff
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  // Register modal stuff
  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  return (
    <CartContextProvider>
      <UserContextProvider>
        <Header
          handleShowLogin={handleShowLogin}
          handleShowRegister={handleShowRegister}
        />

        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route exact path="/">
              <LandingPage handleShowLogin={handleShowLogin} />
            </Route>
            <Route exact path="/detail/:id">
              <DetailProductPage />
            </Route>
            <PrivateRoute exact path="/cart" component={CartPage} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <PrivateRoute
              exact
              path="/profile/edit"
              component={EditProfilePage}
            />
            <PrivateRoute exact path="/add" component={AddProductPage} />
            <PrivateRoute exact path="/income" component={IncomePage} />
          </Switch>
        </AnimatePresence>

        <LoginModal
          handleCloseLogin={handleCloseLogin}
          handleShowRegister={handleShowRegister}
          showLogin={showLogin}
        />
        <RegisterModal
          handleCloseRegister={handleCloseRegister}
          handleShowLogin={handleShowLogin}
          showRegister={showRegister}
        />
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;
