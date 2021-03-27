import { useContext, useState } from "react";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// State Management
import { UserContext } from "../../contexts/userContext";

// Components
import CustomFormInput from "../reusable/CustomFormInput";

// API
import { API, setAuthToken } from "../../utils/api";

// Validation
import { loginSchema } from "../../utils/validations";

export default function LoginModal({
  showLogin,
  handleCloseLogin,
  handleShowRegister,
}) {
  const history = useHistory();

  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const openRegister = () => {
    handleCloseLogin();
    handleShowRegister();
  };

  const handleLogin = async (data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await API.post("/login", data, config);
      userDispatch({
        type: "LOGIN",
        payload: response.data.data.user,
      });
      setAuthToken(response.data.data.user.token);

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
        <Form
          className="d-flex flex-column"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Form.Group controlId="email">
            <Controller
              as={
                <CustomFormInput
                  type="email"
                  placeholder="Email"
                  isInvalid={!!errors.email}
                  ref={register}
                />
              }
              name="email"
              control={control}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="password">
            <Controller
              as={
                <CustomFormInput
                  type="password"
                  placeholder="Password"
                  isInvalid={!!errors.password}
                  ref={register}
                />
              }
              name="password"
              control={control}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            )}
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
