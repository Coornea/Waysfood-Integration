import { useContext, useState } from "react";

import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import SweetAlert from "react-bootstrap-sweetalert";

// State Management
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";

// Components
import HistoryCard from "../reusable/HistoryCard";
import OrderMapModal from "../modal/OrderMapModal";

// Animations
import { pageInit } from "../../utils/animVariants";

// API
import { API, setAuthToken } from "../../utils/api";

function ProfilePage() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { id, fullName, email, image, role, phone } = userState.loggedUser;

  // Order modal stuff
  const [showDelivery, setShowDelivery] = useState(false);
  const handleMapDeliveryClose = () => setShowDelivery(false);
  const handleMapDeliveryShow = () => setShowDelivery(true);

  const [alert, setAlert] = useState(null);
  const hideAlert = () => {
    setAlert(null);
  };
  const showAlert = (title, message) => {
    setAlert(
      <SweetAlert
        info
        confirmBtnText="Confirm"
        confirmBtnBsStyle="success"
        title={title}
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        focusCancelBtn
      >
        {message}
      </SweetAlert>
    );
  };

  // Temporary menu data
  const [tempMenu, setTempMenu] = useState({});

  const { data: transactionsData, loading, error, refetch } = useQuery(
    "transactionsCache",
    async () => {
      setAuthToken(localStorage.token);
      const response = await API.get(
        role === "partner" ? `/transactions/${id}` : `/my-transactions/${id}`
      );
      return response.data;
    }
  );

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
            <Col xs={12} md={12} lg={7}>
              <Row className="mb-4">
                <Col>
                  <h1 className="heading font-weight-bold">My Profile</h1>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm={12} md={4}>
                  <img
                    src={image}
                    alt="profile photo"
                    className="w-100 mb-4 mb-sm-0"
                    height="222"
                    style={{ borderRadius: "5px", objectFit: "scale-down" }}
                  />
                </Col>
                <Col md={8}>
                  <Row className="mb-2">
                    <Col md={12}>
                      <h5 className="text-brown">Full Name</h5>
                    </Col>
                    <Col md={12}>
                      <p>{fullName}</p>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={12}>
                      <h5 className="text-brown">Email</h5>
                    </Col>
                    <Col md={12}>
                      <p>{email}</p>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={12}>
                      <h5 className="text-brown">Phone</h5>
                    </Col>
                    <Col md={12}>
                      <p>{phone}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mb-4 mb-0">
                <Col md={4}>
                  <Button
                    as={Link}
                    to="/profile/edit"
                    variant="brown"
                    className="w-100"
                    size="lg"
                  >
                    Edit Profile
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={12} lg={5}>
              <Row className="mb-4">
                <Col>
                  <h1 className="heading font-weight-bold">
                    History {role === "partner" ? "Order" : "Transaction"}
                  </h1>
                </Col>
              </Row>
              <Row>
                {loading && <Spinner animation="border" variant="warning" />}
                {transactionsData?.data?.transactions?.map((trans, index) => (
                  <HistoryCard
                    key={trans.id}
                    data={trans}
                    handleMapDeliveryShow={handleMapDeliveryShow}
                    setTempMenu={setTempMenu}
                    showAlert={showAlert}
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </motion.div>
      <OrderMapModal
        show={showDelivery}
        handleMapClose={handleMapDeliveryClose}
        data={tempMenu}
        refetch={refetch}
      />
      {alert}
    </>
  );
}

export default ProfilePage;
