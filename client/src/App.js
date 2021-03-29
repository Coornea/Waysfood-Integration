import { useState, useEffect, useContext } from "react";

import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";

// State Management
import { CartContextProvider } from "./contexts/cartContext";
import { UserContext } from "./contexts/userContext";

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

// API
import { API, setAuthToken } from "./utils/api";

//init token pada axios
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const location = useLocation();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  // Login modal stuff
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  // Register modal stuff
  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const checkUser = async () => {
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
    checkUser();
  }, []);

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <CartContextProvider>
        <Header
          handleShowLogin={handleShowLogin}
          handleShowRegister={handleShowRegister}
        />

        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route exact path="/">
              {userState?.loggedUser?.role === "partner" ? (
                <IncomePage />
              ) : (
                <LandingPage handleShowLogin={handleShowLogin} />
              )}
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
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;
