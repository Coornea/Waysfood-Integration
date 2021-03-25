import { useContext } from "react";

import { Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";

// State Management
import { CartContext } from "../../contexts/cartContext";

// Animation
import { menuCardInit } from "../../utils/animVariants";

export default function MenuCard({ data }) {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const { title, price, image } = data;
  const handleOrder = () => {
    cartDispatch({
      type: "ADD_CART",
      payload: data,
    });
  };
  return (
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
            <Button
              variant="warning"
              size="sm"
              className="w-100"
              onClick={handleOrder}
            >
              Order
            </Button>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
}
