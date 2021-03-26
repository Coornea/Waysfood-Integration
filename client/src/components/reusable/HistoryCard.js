import { useState, useEffect, useContext } from "react";
import { Col, Card, Row, Button } from "react-bootstrap";
import { motion } from "framer-motion";

// State Management
import { UserContext } from "../../contexts/userContext";

// Assets
import brandLogo from "../../assets/svg/brand.svg";

function HistoryCard({ data }) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const { userOrder, partnerOrder, status, order } = data;
  const { role } = userState.loggedUser;

  const [price, setPrice] = useState(0);
  const countPrice = () => {
    let tmpPrice = 0;
    order.map((menu) => {
      tmpPrice += tmpPrice + menu.price * menu.qty;
    });
    console.log(tmpPrice);
    setPrice(tmpPrice);
  };

  useEffect(() => {
    countPrice();
  }, []);
  return (
    <Col
      as={motion.div}
      initial={{ y: "50vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      xs={12}
      md={12}
      className="mb-4"
    >
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Row>
            <Col xs={6} md={6}>
              <Row>
                <Col>
                  <p className="heading font-weight-bold mb-1 h5">
                    {role === "partner"
                      ? userOrder.fullName
                      : partnerOrder.fullName}
                  </p>
                  <small className="">
                    {/* <span className="font-weight-bold">{day},</span> {date} */}
                  </small>
                </Col>
              </Row>
            </Col>
            <Col xs={6} md={6} className="text-right">
              <img src={brandLogo} alt="brandLogo" height="40" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={6} md={6}>
              <p className="font-weight-bold" style={{ color: "#974A4A" }}>
                Total : Rp. {price.toLocaleString()}
              </p>
            </Col>
            <Col xs={6} md={6} className=" pl-5 pl-sm-5 ">
              <div
                className="text-green w-100 text-center"
                style={{ backgroundColor: "#E7fff2", borderRadius: "5px" }}
              >
                {status}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default HistoryCard;
