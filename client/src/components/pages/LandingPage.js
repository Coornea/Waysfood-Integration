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
import { useQuery } from "react-query";
import SweetAlert from "react-bootstrap-sweetalert";

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

// API
import { API } from "../../utils/api";

export default function LandingPage({ handleShowLogin }) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const [alert, setAlert] = useState(null);
  const hideAlert = () => {
    setAlert(null);
  };
  const showAlert = () => {
    setAlert(
      <SweetAlert
        warning
        confirmBtnText="Close"
        confirmBtnBsStyle="danger"
        title="Your cart is not empty!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
      >
        Please empty your cart before changing restaurant
      </SweetAlert>
    );
  };

  const { data: RestaurantsData, loading, error, refetch } = useQuery(
    "restaurantsCache",
    async () => {
      const response = await API.get("/partners");
      return response;
    }
  );

  return (
    <>
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
              {RestaurantsData?.data?.data?.partners?.map(
                (restaurant, index) =>
                  index <= 3 && (
                    <PopularCard
                      data={restaurant}
                      key={restaurant.id}
                      handleShowLogin={handleShowLogin}
                      showAlert={showAlert}
                    />
                  )
              )}
            </Row>
            <Row>
              <Col sm={12}>
                <h2 className="heading font-weight-bold mb-4">
                  Restaurant Near You
                </h2>
              </Col>
            </Row>
            <Row>
              {RestaurantsData?.data?.data?.partners?.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  handleShowLogin={handleShowLogin}
                  data={restaurant}
                  showAlert={showAlert}
                />
              ))}
            </Row>
          </Container>
        </div>
      </motion.div>
      {alert}
    </>
  );
}
