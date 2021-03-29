import { useContext, useState } from "react";

import { Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useMutation } from "react-query";
import SweetAlert from "react-bootstrap-sweetalert";

// State Management
import { CartContext } from "../../contexts/cartContext";

// Animation
import { menuCardInit } from "../../utils/animVariants";

// API
import { API, setAuthToken } from "../../utils/api";

export default function MenuCardAdvanced({ data, refetch, setEditId }) {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const { title, price, image } = data;

  const [alert, setAlert] = useState(null);
  const hideAlert = () => {
    setAlert(null);
  };
  const showAlert = () => {
    setAlert(
      <SweetAlert
        danger
        showCancel
        confirmBtnText="Confirm"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => {
          handleDelete();
          hideAlert();
        }}
        onCancel={() => hideAlert()}
        focusCancelBtn
      >
        This action will delete your selected product
      </SweetAlert>
    );
  };

  const deleteProduct = useMutation(async () => {
    const response = await API.delete(`/product/${data.id}`);
    refetch();
    return response.data;
  });

  const handleDelete = () => {
    deleteProduct.mutate();
  };
  return (
    <>
      <Col xs={12} md={4} lg={3} className="mb-4">
        <motion.div variants={menuCardInit}>
          <Card
            style={{ border: "none", cursor: "pointer" }}
            as={motion.div}
            whileHover={{
              scale: 1.1,
            }}
            transition={{ type: "spring", stiffness: 600 }}
          >
            <Card.Img
              variant="top"
              src={image}
              height="175"
              className="p-3"
              style={{ objectFit: "cover" }}
            />
            <Card.Body className="px-3 pt-0">
              <Card.Title
                className="heading font-weight-bolder mb-0"
                style={{ height: "40px" }}
              >
                {title}
              </Card.Title>
              <Card.Text className="heading text-danger">
                Rp. {price.toLocaleString()}
              </Card.Text>
              <Col sm={12}>
                <Button
                  variant="success"
                  size="sm"
                  style={{ width: "90px" }}
                  onClick={() => setEditId(data.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ml-2"
                  style={{ width: "90px" }}
                  onClick={() => showAlert()}
                >
                  Delete
                </Button>
              </Col>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
      {alert}
    </>
  );
}
