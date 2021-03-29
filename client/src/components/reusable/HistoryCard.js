import { useState, useEffect, useContext } from "react";

import { Col, Card, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

// State Management
import { UserContext } from "../../contexts/userContext";

// Assets
import brandLogo from "../../assets/svg/brand.svg";

function HistoryCard({ data, handleMapDeliveryShow, setTempMenu, showAlert }) {
  const history = useHistory();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const { id, userOrder, partnerOrder, status, order, createdAt } = data;
  const { role } = userState.loggedUser;

  const [price, setPrice] = useState(0);

  const handleDate = () => {
    const current = new Date(createdAt);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const timeStr =
      ("0" + current.getHours()).slice(-2) +
      ":" +
      ("0" + current.getMinutes()).slice(-2);
    const currDate = `${("0" + current.getDate()).slice(-2)} ${
      months[current.getMonth()]
    } ${current.getFullYear()}`;
    const currDay = days[current.getDay()];
    return (
      <small className="">
        <span className="font-weight-bold">{currDay},</span> {currDate}
      </small>
    );
  };

  const handleStatus = () => {
    switch (status) {
      case "cancel":
        return (
          <div
            className="text-danger w-100 text-center"
            style={{ backgroundColor: "#FFE8ED", borderRadius: "5px" }}
          >
            Cancel
          </div>
        );
      case "waiting":
        return (
          <div
            className="w-100 text-center"
            style={{
              backgroundColor: "#FFF2D3",
              borderRadius: "5px",
              color: "#FFB400",
            }}
          >
            Waiting Approve
          </div>
        );

      case "otw":
        return (
          <div
            className="w-100 text-center"
            style={{
              backgroundColor: "#E7F6FF",
              borderRadius: "5px",
              color: "#20AFFF",
            }}
          >
            On The Way
          </div>
        );
      case "success":
        return (
          <div
            className="text-green w-100 text-center"
            style={{ backgroundColor: "#E7fff2", borderRadius: "5px" }}
          >
            Finished
          </div>
        );
      default:
        break;
    }
  };

  const countPrice = () => {
    let tmpPrice = 0;
    order.map((menu) => {
      tmpPrice += menu.price * menu.qty;
    });
    setPrice(tmpPrice);
  };

  const handleClick = () => {
    if (userState.loggedUser.role === "partner") {
      history.push("/");
    } else {
      switch (status) {
        case "waiting":
          showAlert("Waiting", "Waiting for your order approval");
          break;

        case "success":
          showAlert("Finished", "Your order is finished");

          break;
        case "cancel":
          showAlert("Cancel", "Your order has been cancelled", true);

          break;
        case "otw":
          setTempMenu({
            id,
          });
          handleMapDeliveryShow();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    countPrice();
  }, [data]);

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
      <Card style={{ border: "none", cursor: "pointer" }} onClick={handleClick}>
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
                  {handleDate()}
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
            <Col
              xs={6}
              md={6}
              className="pl-5 pl-sm-5"
              style={{ fontSize: "0.9em" }}
            >
              {handleStatus()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default HistoryCard;
