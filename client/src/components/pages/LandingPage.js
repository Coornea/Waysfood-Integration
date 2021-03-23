import { useEffect, useState, useContext } from "react";

import {
  Container,
  Col,
  Row,
  Card,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import { motion } from "framer-motion";

// State Management
import { UserContext } from "../../contexts/userContext";

// Components
import HeroSection from "./HeroSection";
import PopularCard from "../reusable/PopularCard";
import RestaurantCard from "../reusable/RestaurantCard";

// Dummy data
import { dummyRestaurant } from "../../utils/data";

// Animations
import { pageInit } from "../../utils/animVariants";

export default function LandingPage({ handleShowLogin }) {
  const [popularRestaurant, setPopularRestaurant] = useState([]);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  // Modal Handler
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);

  const handlePopularRestaurant = () => {
    const sortedVisitRestaurant = dummyRestaurant
      .sort((a, b) => parseFloat(b.totalvisited) - parseFloat(a.totalvisited))
      .slice(0, 4);
    setPopularRestaurant(sortedVisitRestaurant);
  };

  useEffect(() => {
    handlePopularRestaurant();
  }, []);

  return (
    <motion.div
      variants={pageInit}
      initial="hidden"
      animate="visible"
      // exit="exit"
    >
      <HeroSection />
      <div className="bg-grey">
        <Container className="py-5">
          <Row>
            <Col sm={12}>
              <h2 className="heading font-weight-bold mb-4">
                Popular Restaurant
              </h2>
            </Col>
          </Row>
          <Row className="mb-5 py-0">
            {popularRestaurant.map((popular) => (
              <PopularCard
                data={popular}
                key={popular.id}
                handleShowLogin={handleShowLogin}
                handleShowAlert={handleShowAlert}
              />
            ))}
          </Row>
          <Row>
            <Col sm={12}>
              <h2 className="heading font-weight-bold mb-4">
                Restaurant Near You
              </h2>
            </Col>
          </Row>
          <Row>
            {dummyRestaurant.map(
              (restaurant) =>
                restaurant.range <= 2 && (
                  <RestaurantCard
                    key={restaurant.id}
                    handleShowLogin={handleShowLogin}
                    handleShowAlert={handleShowAlert}
                    data={restaurant}
                  />
                )
            )}
          </Row>
        </Container>
      </div>
      <Modal show={showAlert} onHide={handleCloseAlert}>
        <Modal.Body className="text-center text-danger">
          Please empty your cart before changing restaurant
        </Modal.Body>
      </Modal>
    </motion.div>
  );
}
