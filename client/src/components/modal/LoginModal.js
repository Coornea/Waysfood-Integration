import { useContext } from "react";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// State Management
import { UserContext } from "../../contexts/userContext";

// Components
import CustomFormInput from "../reusable/CustomFormInput";

export default function LoginModal({
  showLogin,
  handleCloseLogin,
  handleShowRegister,
}) {
  const history = useHistory();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const LOCAL_KEY = "ways-food-user";

  const openRegister = () => {
    handleCloseLogin();
    handleShowRegister();
  };

  const handleLogin = (data) => {
    const userData = JSON.parse(localStorage.getItem(LOCAL_KEY));
    const checkUser = userData.find((user) => user.email == data.email);
    if (checkUser) {
      if (checkUser.password == data.password) {
        localStorage.setItem(`${LOCAL_KEY}-login`, JSON.stringify(checkUser));
        userDispatch({
          type: "LOGIN",
          payload: checkUser,
        });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (handleLogin(userData)) {
      const userData = JSON.parse(localStorage.getItem(`${LOCAL_KEY}-login`));
      userData.userrole == 1 ? history.push("/income") : history.push("/");
      handleCloseLogin();
    }
  };

  return (
    <Modal
      show={showLogin}
      onHide={handleCloseLogin}
      dialogClassName="form-modal"
    >
      <Modal.Body className="px-4 py-5">
        <h2 className="text-warning mb-4">Login</h2>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <CustomFormInput
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <CustomFormInput
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <Button variant="brown" type="submit" className="mb-3">
            Login
          </Button>
          <Form.Text className="text-muted text-center">
            Don't have an account ? Click{" "}
            <a
              href="#!"
              className="font-weight-bold text-secondary"
              onClick={openRegister}
            >
              Here
            </a>
          </Form.Text>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
