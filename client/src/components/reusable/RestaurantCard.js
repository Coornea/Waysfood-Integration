import { useContext, useEffect, useState } from "react";

import { Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

// State Management
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";

// Animation
import { cardInit } from "../../utils/animVariants";

// API
import { API } from "../../utils/api";

export default function RestaurantCard({ handleShowLogin, data, showAlert }) {
  const history = useHistory();
  const [image, setImage] = useState("");
  const { id, fullName, range } = data;
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const handleClick = () => {
    /**
     * NOTE!!
     * List Pengecekan :
     * 1. Belum login > tampilkan modal login > (RESTRICTED)
     * 2. Sudah Login > jumlah cart = 0 > masuk > (ACCEPTED)
     * 3. Sudah Login > jumlah cart != 0 (berisi), tapi restaurant pilihan sama > masuk > (ACCEPTED)
     * 4. Diluar kondisi diatas > tolak > tampilkan modal tidak bisa masuk ke restaurant lain sebelum cart kosong > (RESTRICTED)
     */

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
  const handleImage = async () => {
    const response = await API.get(`/products/${id}`);
    const firstImage = response?.data?.data?.products[0]?.image;
    // setImage(response?.data?.data?.products[0].image);
    firstImage ? setImage(firstImage) : setImage(data.image);
  };

  useEffect(() => {
    handleImage();
  }, []);
  return (
    <Col xs={12} md={6} lg={3} className="mb-4">
      <motion.div variants={cardInit} initial="hidden" animate="visible">
        <Card
          style={{ border: "none", cursor: "pointer" }}
          onClick={handleClick}
          as={motion.div}
          whileHover={{ scale: 1.1 }}
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
            <Card.Title className="heading font-weight-bolder">
              {fullName}
            </Card.Title>
            <Card.Text className="heading">{range} KM</Card.Text>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
}
