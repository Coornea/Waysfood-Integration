import { useContext, useState, useEffect } from "react";

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
import { useMutation, useQuery } from "react-query";
import SweetAlert from "react-bootstrap-sweetalert";

// State Management
import { UserContext } from "../../contexts/userContext";

// Components
import CustomFormInput from "../reusable/CustomFormInput";
import CustomFormFile from "../reusable/CustomFormFile";
import MenuCardAdvanced from "../reusable/MenuCardAdvanced";

// Animations
import { pageInit } from "../../utils/animVariants";

// API
import { API } from "../../utils/api";
function AddProductPage() {
  const history = useHistory();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: null,
  });
  const [editId, setEditId] = useState(0);

  const { title, price, image } = form;
  const { id } = userState.loggedUser;

  // Modal Handler
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [alert, setAlert] = useState(null);
  const hideAlert = () => {
    setAlert(null);
  };
  const showAlert = () => {
    setAlert(
      <SweetAlert
        success
        confirmBtnText="Confirm"
        confirmBtnBsStyle="success"
        title="Success!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        focusCancelBtn
      >
        Your product has been updated
      </SweetAlert>
    );
  };

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
    const response =
      editId == 0
        ? await API.post("/product", body, config)
        : await API.patch(`/product/${editId}`, body, config);

    response.data.status === "success" && showAlert();
    setForm({
      title: "",
      price: "",
      image: null,
    });
    refetch();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct.mutate();
  };

  const { data: MenuData, loading, error, refetch } = useQuery(
    "menuData",
    async () => {
      const response = await API.get(`/products/${id}`);
      return response;
    }
  );

  const loadEachMenu = async () => {
    try {
      if (editId > 0) {
        const response = await API.get(`/product/${editId}`);
        const { title, price } = response.data.data.product;
        setForm({
          ...form,
          title,
          price,
        });
      }
    } catch (error) {}
  };

  const onChange = (e) => {
    const tempForm = { ...form };
    tempForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(tempForm);
  };

  useEffect(() => {
    loadEachMenu();
  }, [editId]);

  return (
    <>
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
                {editId == 0 ? "Add" : "Edit"} Product
              </h1>
              {addProduct.error?.response?.data && (
                <Alert variant="danger">
                  {addProduct.error?.response?.data?.message}
                </Alert>
              )}
            </Col>
          </Row>
          <Row className="mb-5">
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
          <Row className="mb-4">
            <Col xs={12}>
              <h1 className="heading font-weight-bold">Product List</h1>
            </Col>
          </Row>
          <Row>
            {MenuData?.data?.data?.products?.map((menu) => (
              <MenuCardAdvanced
                key={menu.id}
                data={menu}
                refetch={refetch}
                setEditId={setEditId}
              />
            ))}
          </Row>
        </Container>
      </motion.div>
      {alert}
    </>
  );
}

export default AddProductPage;
