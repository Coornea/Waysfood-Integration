import { useState } from "react";

import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import MapModal from "../modal/MapModal";
import CustomFormInput from "../reusable/CustomFormInput";
import CustomFormFile from "../reusable/CustomFormFile";

// Assets
import iconMap from "../../assets/svg/map.svg";

// Animations
import { pageInit } from "../../utils/animVariants";

function EditProfilePage() {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem("ways-food-user-login"));

  // Modal Handler
  const [show, setShow] = useState(false);
  const handleMapClose = () => setShow(false);
  const handleMapShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/profile");
  };
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
              Edit Profile {currentUser.userrole == 1 && "Partner"}
            </h1>
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
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} lg={3}>
                  <Form.Group controlId="inputFile">
                    <CustomFormFile
                      placeholder="Attach Image"
                      name="inputFile"
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
