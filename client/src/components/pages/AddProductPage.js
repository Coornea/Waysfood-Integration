import { useState } from "react";

import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import CustomFormInput from "../reusable/CustomFormInput";
import CustomFormFile from "../reusable/CustomFormFile";

// Animations
import { pageInit } from "../../utils/animVariants";

function AddProductPage() {
  const history = useHistory();

  // Modal Handler
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShow();
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
            <h1 className="heading font-weight-bold">Add Product</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} lg={9}>
                  <Form.Group>
                    <CustomFormInput
                      isBrown="true"
                      type="text"
                      placeholder="Title"
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
                      isBrown="true"
                      type="text"
                      placeholder="Price"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col xs={12} lg={12} className="text-right">
                  <Button variant="brown" className="w-25" type="submit">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="text-warning text-center">
          Success Add Product
        </Modal.Body>
      </Modal>
    </motion.div>
  );
}

export default AddProductPage;
