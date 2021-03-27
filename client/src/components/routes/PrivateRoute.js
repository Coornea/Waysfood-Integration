import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

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
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
