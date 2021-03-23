import { Modal, Button, Form } from "react-bootstrap";

// Assets
import imgProfile from "../../assets/img/profile.png";

// Components
import CustomFormInput from "../reusable/CustomFormInput";

export default function RegisterModal({
  showRegister,
  handleCloseRegister,
  handleShowLogin,
}) {
  const LOCAL_KEY = "ways-food-user";

  const openLogin = () => {
    handleCloseRegister();
    handleShowLogin();
  };

  const handleRegister = (data) => {
    !localStorage.getItem(LOCAL_KEY) &&
      localStorage.setItem(LOCAL_KEY, JSON.stringify([]));

    const localData = JSON.parse(localStorage.getItem(LOCAL_KEY));
    const { id, email, password, fullname, gender, phone, userrole } = data;
    const products = userrole === "As Partner" && { products: [] };
    const userData = {
      id,
      email,
      password,
      fullname,
      gender,
      phone,
      userrole: userrole === "As Partner" ? 1 : 0,
      photo: imgProfile,
      location: "LOCATION",
      ...products,
    };
    const tempData = [...localData, userData];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tempData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: Math.floor(Math.random() * Math.floor(100)),
      email: e.target.email.value,
      password: e.target.password.value,
      fullname: e.target.fullname.value,
      gender: e.target.gender.value,
      phone: e.target.phone.value,
      userrole: e.target.userrole.value,
    };
    handleRegister(userData);
    openLogin();
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
              required
            />
          </Form.Group>
          <Form.Group controlId="fullname">
            <CustomFormInput
              type="text"
              placeholder="Full Name"
              name="fullname"
              required
            />
          </Form.Group>
          <Form.Group controlId="gender">
            <CustomFormInput
              type="text"
              placeholder="Gender"
              name="gender"
              required
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <CustomFormInput
              type="text"
              placeholder="Phone"
              name="phone"
              required
            />
          </Form.Group>
          <Form.Group controlId="userrole" name="userrole">
            <Form.Control
              as="select"
              style={{
                height: "50px",
                boxShadow: "none",
                backgroundColor: "rgba(210, 210, 210, 0.25)",
                border: "3px solid #D2D2D2",
              }}
            >
              <option>As User</option>
              <option>As Partner</option>
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
