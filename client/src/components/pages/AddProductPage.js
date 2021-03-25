import { useState } from "react";

import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation } from "react-query";

// Components
import CustomFormInput from "../reusable/CustomFormInput";
import CustomFormFile from "../reusable/CustomFormFile";

// Animations
import { pageInit } from "../../utils/animVariants";

// API
import { API } from "../../utils/api";
function AddProductPage() {
  const history = useHistory();
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: null,
  });

  const { title, price, image } = form;

  // Modal Handler
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addProduct = useMutation(async () => {
    const body = new FormData();

    body.append("title", title);
    body.append("price", price);
    body.append("image", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await API.post("/product", body, config);

    response.data.status === "success" && handleShow();
    setForm({
      title: "",
      price: "",
      image: null,
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct.mutate();
  };

  const onChange = (e) => {
    const tempForm = { ...form };
    tempForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(tempForm);
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
            {addProduct.error?.response?.data && (
              <Alert variant="danger">
                {addProduct.error?.response?.data?.message}
              </Alert>
            )}
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
                      name="title"
                      onChange={(e) => onChange(e)}
                      value={title}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} lg={3}>
                  <Form.Group controlId="image">
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
                      isBrown="true"
                      type="number"
                      placeholder="Price"
                      name="price"
                      onChange={(e) => onChange(e)}
                      value={price}
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
