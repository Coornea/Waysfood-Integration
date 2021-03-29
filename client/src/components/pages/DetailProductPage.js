import { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "react-query";

// Components
import MenuCard from "../reusable/MenuCard";

// Dummy data
import { dummyRestaurant } from "../../utils/data";
import HeroDetail from "../reusable/HeroDetail";

// Animations
import { pageInit } from "../../utils/animVariants";

// API
import { API } from "../../utils/api";

export default function DetailProductPage() {
  // const [menu, setMenu] = useState(null);
  const { id } = useParams();

  const {
    data: RestaurantData,
    loading: restaurantLoading,
    error: restaurantError,
    refetch: restaurantRefetch,
  } = useQuery("restaurantCache", async () => {
    const response = await API.get(`/user/${id}`);
    console.log(response.data.data.user);
    return response;
  });

  const {
    data: MenuData,
    loading: menuLoading,
    error: menuError,
    refetch: menuRefetch,
  } = useQuery("menuData", async () => {
    const response = await API.get(`/products/${id}`);
    return response;
  });

  return (
    <motion.div
      variants={pageInit}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <HeroDetail data={RestaurantData?.data?.data?.user} />
      <div className="bg-grey py-5 mt-4">
        <Container>
          <Row>
            <Col xs={12}>
              <h1 className="heading font-weight-bold mb-4">
                {RestaurantData?.data?.data?.user?.fullName}, Menus
              </h1>
            </Col>
          </Row>
          <Row>
            {MenuData?.data?.data?.products?.map((menu) => (
              <MenuCard key={menu.id} data={menu} />
            ))}
          </Row>
        </Container>
      </div>
    </motion.div>
  );
}
