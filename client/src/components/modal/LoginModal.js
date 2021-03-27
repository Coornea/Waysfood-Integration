import { useContext, useState } from "react";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// State Management
import { UserContext } from "../../contexts/userContext";

// Components
import CustomFormInput from "../reusable/CustomFormInput";

// API
import { API, setAuthToken } from "../../utils/api";

export default function LoginModal({
  showLogin,
  handleCloseLogin,
  handleShowRegister,
}) {
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const openRegister = () => {
    handleCloseLogin();
    handleShowRegister();
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await API.post("/login", form, config);
      console.log(response.data);
      userDispatch({
        type: "LOGIN",
        payload: response.data.data.user,
      });
      setAuthToken(response.data.data.user.token);
      setForm({
        email: "",
        password: "",
      });
      handleCloseLogin();
    } catch (err) {
      console.log(err.response);
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
              value={email}
              onChange={(e) => onChange(e)}
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <CustomFormInput
              value={password}
              onChange={(e) => onChange(e)}
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
