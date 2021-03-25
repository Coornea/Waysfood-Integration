import { useState, useContext, useEffect } from "react";

import { Container, Col, Row, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation } from "react-query";

// Components
import MapModal from "../modal/MapModal";
import CustomFormInput from "../reusable/CustomFormInput";
import CustomFormFile from "../reusable/CustomFormFile";

// State Management
import { UserContext } from "../../contexts/userContext";

// Assets
import iconMap from "../../assets/svg/map.svg";

// Animations
import { pageInit } from "../../utils/animVariants";

// API
import { API, setAuthToken } from "../../utils/api";

function EditProfilePage() {
  const history = useHistory();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null,
  });
  const { id } = userState.loggedUser;
  const { fullName, email, password, image } = form;

  // Load user data
  const loadUserData = async () => {
    setAuthToken(localStorage.token);
    const response = await API.get(`/user/${id}`);
    const user = response.data.data.user;
    setForm({
      ...form,
      fullName: user.fullName,
      email: user.email,
    });
  };

  // Modal Handler
  const [show, setShow] = useState(false);
  const handleMapClose = () => setShow(false);
  const handleMapShow = () => setShow(true);

  const addUser = useMutation(async () => {
    const body = new FormData();
    const location = `${userState.orderLocation.lng},${userState.orderLocation.lat}`;

    body.append("fullName", fullName);
    body.append("email", email);
    body.append("password", password);
    body.append("location", location);
    body.append("image", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await API.patch(`/user/${id}`, body, config);
    userDispatch({
      type: "EDIT_SUCCESS",
      payload: {
        ...response.data.data.user,
        token: localStorage.token,
      },
    });

    setForm({
      fullName: "",
      email: "",
      password: "",
      image: null,
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser.mutate();
    !addUser?.error && history.push("/profile");
  };

  const onChange = (e) => {
    const tempForm = { ...form };
    tempForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(tempForm);
  };
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <motion.div
      variants={pageInit}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-grey py-5 mt-4"
    >
      <Container>
        <Row className="mb-4">
          <Col xs={12}>
            <h1 className="heading font-weight-bold">
              Edit Profile{" "}
              {userState.loggedUser.role === "partner" && "Partner"}
            </h1>
            {addUser.error?.response?.data && (
              <Alert variant="danger">
                {addUser.error?.response?.data?.message}
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} lg={9}>
                  <Form.Group>
                    <CustomFormInput
                      isBrown={true}
                      type="text"
                      placeholder="Full Name"
                      name="fullName"
                      value={fullName}
                      onChange={(e) => onChange(e)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} lg={3}>
                  <Form.Group controlId="inputFile">
                    <CustomFormFile
                      placeholder="Attach Image"
                      name="image"
                      onChange={onChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12} lg={12}>
                  <Form.Group>
                    <CustomFormInput
                      isBrown={true}
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={12}>
                  <Form.Group>
                    <CustomFormInput
                      isBrown={true}
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={9}>
                  <Form.Group>
                    <CustomFormInput
                      isBrown={true}
                      type="text"
                      placeholder="Location"
                      value={userState.orderPlace}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} lg={3}>
                  <Button
                    variant="brown"
                    className="w-100"
                    style={{ height: "50px" }}
                    onClick={handleMapShow}
                  >
                    Select On Map
                    <img src={iconMap} alt="map icon" className="ml-2" />
                  </Button>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col lg={12} className="text-right">
                  <Button variant="brown" className="w-25" type="submit">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <MapModal show={show} handleMapClose={handleMapClose} from="user" />
    </motion.div>
  );
}

export default EditProfilePage;
