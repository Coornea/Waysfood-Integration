import { useContext } from "react";

import { Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";

// State Management
import { CartContext } from "../../contexts/cartContext";

// Assets
import iconRemove from "../../assets/svg/remove.svg";

export default function CartOrder({ data }) {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const { id, image, title, price, qty } = data;

  const handleRemoveCart = () => {
    cartDispatch({
      type: "REMOVE_CART",
      payload: data,
    });
  };

  const handleAddCart = () => {
    cartDispatch({
      type: "ADD_CART",
      payload: data,
    });
  };

  const handleDeleteCart = () => {
    cartDispatch({
      type: "DELETE_CART",
      payload: data,
    });
  };

  return (
    <motion.div
      exit={{ y: "-50vh" }}
      initial={{ y: "50vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
    >
      <Row>
        <Col xs={3} md={2}>
          <img
            src={image}
            alt="order 1"
            style={{
              backgroundSize: "cover",
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </Col>
        <Col xs={9} md={10} className="py-2">
          <Row>
            <Col xs={6} md={6}>
              <p className="heading font-weight-bold">{title}</p>
            </Col>
            <Col xs={6} md={6}>
              <p className="text-danger text-right">
                Rp. {price.toLocaleString()}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6} className="d-flex align-items-center ">
              <Button
                variant="light"
                className="font-weight-bold h3 mb-0 text-brown"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={handleRemoveCart}
              >
                -
              </Button>
              <p
                className="mb-0 px-3 mx-2"
                style={{
                  backgroundColor: "#F6E6DA",
                  borderRadius: "5px",
                }}
              >
                {data.qty}
              </p>
              <Button
                variant="light"
                className="font-weight-bold h3 mb-0 text-brown"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={handleAddCart}
              >
                +
              </Button>
            </Col>
            <Col xs={6} md={6} className="text-right my-auto">
              <Button
                variant="light"
                className="font-weight-bold h3 mb-0 text-brown"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={handleDeleteCart}
                as={motion.button}
                whileHover={{
                  rotate: [0, 20, -20, 20, -20, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <img src={iconRemove} alt="remove icon" height="20" />
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <hr className="divider" />
        </Col>
      </Row>
    </motion.div>
  );
}
