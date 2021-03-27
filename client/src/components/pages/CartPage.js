import { useState, useContext, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import SweetAlert from "react-bootstrap-sweetalert";

// State Management
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";

// Components
import CartOrder from "../reusable/CartOrder";
import MapModal from "../modal/MapModal";

// Assets
import iconMap from "../../assets/svg/map.svg";

// Animations
import { pageInit } from "../../utils/animVariants";

// API
import { API, setAuthToken } from "../../utils/api";

export default function CartPage() {
  const history = useHistory();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  // Modal Handler
  const [show, setShow] = useState(false);
  const handleMapClose = () => setShow(false);
  const handleMapShow = () => setShow(true);

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [delivery, setDelivery] = useState(10000);
  const [total, setTotal] = useState(0);

  const [alert, setAlert] = useState(null);
  const hideAlert = () => {
    setAlert(null);
    history.push("/profile");
    cartDispatch({
      type: "EMPTY_CART",
    });
  };
  const showAlert = () => {
    setAlert(
      <SweetAlert
        success
        title="Order Success!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
      >
        Your order is being processed
      </SweetAlert>
    );
  };

  useEffect(() => {
    let tmpQty = 0;
    let tmpPrice = 0;

    cartState.carts.map((cart) => {
      tmpQty = tmpQty + cart.qty;
      tmpPrice = tmpPrice + cart.price * cart.qty;
    });

    setQuantity(tmpQty);
    setPrice(tmpPrice);
    setTotal(tmpPrice + delivery);
  }, [cartState.carts]);

  const handleOrder = async () => {
    const products = {
      partnerId: cartState.currentRestaurant.id,
      products: [
        ...cartState.carts.map((cart) => ({
          id: cart.id,
          qty: cart.qty,
        })),
      ],
    };
    setAuthToken(localStorage.token);
    const response = await API.post("/transaction", products);
    response?.data?.status === "success" && showAlert();
  };

  if (!userState.isLogin) {
    history.push("/");
    return null;
  }

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
            <Col sm={12}>
              <h1 className="heading font-weight-bold">
                {cartState?.currentRestaurant?.fullName}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <h5 className="text-brown font-weight-normal">
                Deliver Location
              </h5>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col sm={12} lg={9} className="mb-2">
              <InputGroup>
                <FormControl
                  value={userState.orderPlace}
                  size="lg"
                  style={{
                    fontSize: "0.9em",
                    height: "50px",
                    boxShadow: "none",
                    backgroundColor: "white",
                    border: "none",
                  }}
                />
              </InputGroup>
            </Col>
            <Col sm={12} lg={3}>
              <Button
                variant="brown"
                className="w-100"
                onClick={handleMapShow}
                style={{ height: "50px" }}
              >
                Select On Map
                <img src={iconMap} alt="map icon" className="ml-2" />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <h5 className="text-brown font-weight-normal">
                Review your order
              </h5>
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={7}>
              <hr className="divider" />
              {cartState.carts.map((cart) => (
                <CartOrder data={cart} key={cart.id} />
              ))}
            </Col>
            <Col lg={5}>
              <hr className="divider d-none d-lg-block" />
              <Row>
                <Col xs={6} lg={6}>
                  <p>Subtotal</p>
                </Col>
                <Col xs={6} lg={6}>
                  <p className="text-right text-danger">
                    Rp. {price.toLocaleString()}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={6}>
                  <p>Qty</p>
                </Col>
                <Col xs={6} lg={6}>
                  <p className="text-right">{quantity}</p>
                </Col>
              </Row>
              <Row className="pb-0">
                <Col xs={6} lg={6}>
                  <p className="mb-0">Ongkir</p>
                </Col>
                <Col xs={6} lg={6}>
                  <p className="text-right text-danger mb-0">
                    Rp. {delivery.toLocaleString()}
                  </p>
                </Col>
              </Row>
              <hr className="divider" />
              <Row className="pb-0">
                <Col xs={6} lg={6}>
                  <p className="mb-0 text-danger font-weight-bold">Total</p>
                </Col>
                <Col xs={6} lg={6}>
                  <p className="text-right text-danger font-weight-bold mb-0">
                    Rp. {total.toLocaleString()}
                  </p>
                </Col>
              </Row>
              <Row className="mt-5 justify-content-end">
                <Col sm={8} className="text-right mt-5">
                  <Button
                    variant="brown"
                    className="w-100 "
                    onClick={handleOrder}
                  >
                    Order
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <MapModal show={show} handleMapClose={handleMapClose} from="delivery" />
      </motion.div>
      {alert}
    </>
  );
}
