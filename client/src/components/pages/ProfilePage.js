import { useContext } from "react";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// State Management
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";

// Components
import HistoryCard from "../reusable/HistoryCard";

// Assets
import imgProfileBig from "../../assets/img/profile-big.png";
import bensu from "../../assets/img/restaurant/bensu.png";

// Animations
import { pageInit } from "../../utils/animVariants";

function ProfilePage() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const {
    id,
    email,
    password,
    fullname,
    gender,
    phone,
    userrole,
  } = userState.loggedUser;

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
          <Col xs={12} md={12} lg={7}>
            <Row className="mb-4">
              <Col>
                <h1 className="heading font-weight-bold">My Profile</h1>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={12} md={4}>
                <img
                  src={userrole ? bensu : imgProfileBig}
                  alt="profile photo"
                  className="w-100 mb-4 mb-sm-0"
                  height="222"
                  style={{ borderRadius: "5px", objectFit: "cover" }}
                />
              </Col>
              <Col md={8}>
                <Row className="mb-2">
                  <Col md={12}>
                    <h5 className="text-brown">Full Name</h5>
                  </Col>
                  <Col md={12}>
                    <p>{fullname}</p>
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
                  History {userrole ? "Order" : "Transaction"}
                </h1>
              </Col>
            </Row>
            <Row>
              {cartState.transactions.map((tran, index) =>
                userState.loggedUser.userrole == 1
                  ? tran.restaurant.title === userState.loggedUser.fullname && (
                      <HistoryCard
                        key={index}
                        userrole={userrole}
                        data={tran}
                      />
                    )
                  : tran.user.fullname === userState.loggedUser.fullname && (
                      <HistoryCard
                        key={index}
                        userrole={userrole}
                        data={tran}
                      />
                    )
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default ProfilePage;
