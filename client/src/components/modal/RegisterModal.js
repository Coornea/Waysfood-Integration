import { useState, useContext } from "react";

import { Modal, Button, Form } from "react-bootstrap";
import * as yup from "yup";

// Components
import CustomFormInput from "../reusable/CustomFormInput";

// State Management
import { UserContext } from "../../contexts/userContext";

// API
import { API, setAuthToken } from "../../utils/api";

export default function RegisterModal({
  showRegister,
  handleCloseRegister,
  handleShowLogin,
}) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "male",
    phone: "",
    role: "user",
  });

  const { email, password, fullName, gender, phone, role } = form;

  const openLogin = () => {
    handleCloseRegister();
    handleShowLogin();
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schema = yup.object().shape({
      email: yup.string().email().min(10).max(30).required(),
      password: yup.string().min(5).max(20).required(),
      fullName: yup.string().max(50).required(),
      gender: yup.string().max(20).required(),
      phone: yup.string().min(5).max(13).required(),
      role: yup.string().max(10).required(),
    });

    try {
      const validate = await schema.validate(form);
    } catch (error) {
      return console.log(error);
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await API.post("/register", form, config);
      console.log(response.data);
      userDispatch({
        type: "LOGIN",
        payload: response.data.data.user,
      });
      setAuthToken(response.data.data.user.token);
      setForm({
        email: "",
        password: "",
        fullName: "",
        gender: "male",
        phone: "",
        role: "user",
      });
      handleCloseRegister();
    } catch (error) {
      return console.log(error?.response?.data?.message);
    }
  };

  return (
    <Modal
      show={showRegister}
      onHide={handleCloseRegister}
      dialogClassName="form-modal"
    >
      <Modal.Body className="px-4 py-5">
        <h2 className="text-warning mb-4">Register</h2>
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
              required
            />
          </Form.Group>
          <Form.Group controlId="fullName">
            <CustomFormInput
              value={fullName}
              onChange={(e) => onChange(e)}
              type="text"
              placeholder="Full Name"
              name="fullName"
              required
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <CustomFormInput
              value={phone}
              onChange={(e) => onChange(e)}
              type="number"
              placeholder="Phone"
              name="phone"
              required
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Control
              as="select"
              style={{
                height: "50px",
                boxShadow: "none",
                backgroundColor: "rgba(210, 210, 210, 0.25)",
                border: "3px solid #D2D2D2",
                color: "#6c757d",
              }}
              name="gender"
              value={gender}
              onChange={(e) => onChange(e)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="-">-</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Control
              as="select"
              style={{
                height: "50px",
                boxShadow: "none",
                backgroundColor: "rgba(210, 210, 210, 0.25)",
                border: "3px solid #D2D2D2",
                color: "#6c757d",
              }}
              name="role"
              value={role}
              onChange={(e) => onChange(e)}
            >
              <option value="user">As User</option>
              <option value="partner">As Partner</option>
            </Form.Control>
          </Form.Group>
          <Button variant="brown" type="submit" className="mb-3">
            Register
          </Button>
          <Form.Text className="text-muted text-center">
            Already have an account ? Click{" "}
            <a
              href="#!"
              className="font-weight-bold text-secondary"
              onClick={openLogin}
            >
              Here
            </a>
          </Form.Text>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
