import { useContext } from "react";

import { Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

// State Management
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";

// Animation
import { cardInit } from "../../utils/animVariants";

export default function PopularCard({ data, handleShowLogin, showAlert }) {
  const history = useHistory();
  const { id, image, fullName } = data;
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const handleClick = () => {
    console.log(data);

    if (userState.isLogin) {
      if (cartState.carts.length == 0) {
        cartDispatch({
          type: "CURRENT_RESTAURANT",
          payload: {
            id,
            fullName,
          },
        });
        history.push(`/detail/${id}`);
      } else {
        if (
          cartState.carts.length !== 0 &&
          cartState.currentRestaurant.fullName === fullName
        ) {
          cartDispatch({
            type: "CURRENT_RESTAURANT",
            payload: {
              id,
              fullName,
            },
          });
          history.push(`/detail/${id}`);
        } else {
          showAlert();
        }
      }
    } else {
      handleShowLogin();
    }
  };
  return (
    <Col xs={12} md={6} lg={3} className="mb-3">
      <motion.div variants={cardInit} initial="hidden" animate="visible">
        <Container>
          <Row
            className="bg-white py-3"
            style={{ borderRadius: 5, cursor: "pointer" }}
            onClick={handleClick}
            as={motion.div}
            whileHover={{
              scale: 1.1,
            }}
            transition={{ type: "spring", stiffness: 600 }}
          >
            <Col xs={3} className="text-center">
              <img
                src={image}
                style={{
                  width: "65px",
                  height: "65px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                alt={fullName}
              />
            </Col>
            <Col xs={9} className="my-auto text-center">
              <h3 className="heading my-0 font-weight-bold">{fullName}</h3>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </Col>
  );
}
