import { Container, Col, Row } from "react-bootstrap";

// SVG
import restaurant from "../../assets/svg/restaurant.svg";

export default function HeroDetail({ data }) {
  return (
    <div className="py-5 bg-brown">
      <Container>
        <Row>
          <Col xs={12} lg={6} className="text-center">
            <img src={restaurant} alt="restaurant" className="w-75 w-lg-100" />
          </Col>
          <Col
            xs={12}
            lg={6}
            className="d-flex flex-column justify-content-center"
          >
            <h1 className="heading display-4 font-weight-bold text-white">
              {data?.fullName}
            </h1>
            <p className="text-warning">Restaurant</p>
            <div className="bot-text mt-0 d-flex">
              <div
                className="line bg-warning mr-4 mt-0"
                style={{ width: "180px", height: "4px", borderRadius: "10px" }}
              ></div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
