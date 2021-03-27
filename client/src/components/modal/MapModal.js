import { useState, useEffect, useContext } from "react";

import { Modal, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// State Management
import { CartContext } from "../../contexts/cartContext";
import { UserContext } from "../../contexts/userContext";

// Components
import MapRender from "../reusable/MapRender";

// Assets
import iconMapPointer from "../../assets/svg/map-pointer.svg";

function MapModal({ show, handleMapClose, from }) {
  const history = useHistory();
  const [isFinished, setIsFinished] = useState(false);

  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");

  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const fetchLocation = async () => {
    const { lng, lat } = userState.orderLocation;
    const token = process.env.REACT_APP_MAPBOX_TOKEN;
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?limit=1&access_token=${token}`;

    const api = await fetch(apiUrl);
    const response = await api.json();

    setPlace(response.features[0].text);
    setAddress(response.features[0].place_name);
  };

  const handleLocation = () => {
    handleMapClose();
    userDispatch({
      type: "ORDER_PLACE",
      payload: place,
    });
  };

  const renderDialog = () => {
    switch (from) {
      case "delivery":
        return (
          <div
            className="shadow p-3 overflow-auto"
            style={{
              width: "400px",
              height: "200px",
              position: "absolute",
              left: "50%",
              bottom: "0",
              backgroundColor: "white",
              transform: "translateX(-50%)",
              borderRadius: "5px",
            }}
          >
            <Row className="mb-2">
              <Col>
                <h5 className="font-weight-bold mb-0">
                  Select delivery location
                </h5>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col lg={2}>
                <img src={iconMapPointer} alt="map pointer" width="55" />
              </Col>
              <Col lg={10}>
                <Row>
                  <Col lg={12}>
                    <small className="font-weight-bold">{place}</small>
                  </Col>

                  <Col lg={12} style={{ lineHeight: "1" }}>
                    <small className="text-sm">{address}</small>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick={handleLocation}
                  variant="brown"
                  className="w-100"
                >
                  Confirm Location
                </Button>
              </Col>
            </Row>
          </div>
        );
        break;
      case "order":
        return (
          <div
            className="shadow p-3 overflow-auto"
            style={{
              width: "500px",
              height: "350px",
              position: "absolute",
              right: "30px",
              top: "30px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            <Row className="mb-4">
              <Col>
                <h5 className="font-weight-bold mb-0">
                  Waiting for the transaction to be approved
                </h5>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col lg={2}>
                <img src={iconMapPointer} alt="map pointer" width="55" />
              </Col>
              <Col lg={10}>
                <Row>
                  <Col lg={12}>
                    <small className="font-weight-bold">{place}</small>
                  </Col>

                  <Col lg={12} style={{ lineHeight: "1" }}>
                    <small className="text-sm">{address}</small>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="mb-4">
                <h5 className="font-weight-bold mb-0">Delivery Time</h5>
              </Col>
              <Col>
                <p>10 - 15 minutes</p>
              </Col>
            </Row>
            {isFinished && (
              <Row className="mt-4">
                <Col lg={12}>
                  <Button
                    variant="brown"
                    className="w-100"
                    onClick={handleFinished}
                  >
                    Finished Order
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        );
        break;
      case "user":
        return (
          <div
            className="shadow p-3 overflow-auto"
            style={{
              width: "400px",
              height: "200px",
              position: "absolute",
              left: "50%",
              bottom: "0",
              backgroundColor: "white",
              transform: "translateX(-50%)",
              borderRadius: "5px",
            }}
          >
            <Row className="mb-2">
              <Col>
                <h5 className="font-weight-bold mb-0">Select my location</h5>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col lg={2}>
                <img src={iconMapPointer} alt="map pointer" width="55" />
              </Col>
              <Col lg={10}>
                <Row>
                  <Col lg={12}>
                    <small className="font-weight-bold">{place}</small>
                  </Col>

                  <Col lg={12} style={{ lineHeight: "1" }}>
                    <small className="text-sm">{address}</small>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick={handleLocation}
                  variant="brown"
                  className="w-100"
                >
                  Confirm Location
                </Button>
              </Col>
            </Row>
          </div>
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    fetchLocation();
  }, [userState.orderLocation]);

  const handleFinished = () => {
    handleMapClose();
  };
  return (
    <Modal show={show} dialogClassName="custom-modal" onHide={handleMapClose}>
      <Modal.Body style={{ position: "relative" }}>
        <MapRender
          isMarker={from === "delivery" || (from === "user" && true)}
        />
        {renderDialog()}
      </Modal.Body>
    </Modal>
  );
}

export default MapModal;
