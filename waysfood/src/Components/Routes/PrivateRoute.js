import { Spinner } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../Context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
   const { state: userState } = useContext(UserContext);

   return (
      <Route
         {...rest}
         render={(props) =>
            userState.loading ? (
               <>
                  <Spinner animation="border" />
               </>
            ) : userState.isLogin ? (
               <Component {...props} />
            ) : (
               <Link to="/" />
            )
         }
      />
   );
};

export default PrivateRoute;
