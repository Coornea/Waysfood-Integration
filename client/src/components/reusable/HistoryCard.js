import { Col, Card, Row, Button } from "react-bootstrap";
import { motion } from "framer-motion";

// Assets
import brandLogo from "../../assets/svg/brand.svg";

function HistoryCard({ userrole, data }) {
  const { date, day, total, user, restaurant } = data;
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
                    {userrole ? user.fullname : restaurant.title}
                  </p>
                  <small className="">
                    <span className="font-weight-bold">{day},</span> {date}
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
                Total : Rp. {total.toLocaleString()}
              </p>
            </Col>
            <Col xs={6} md={6} className=" pl-5 pl-sm-5 ">
              <div
                className="text-green w-100 text-center"
                style={{ backgroundColor: "#E7fff2", borderRadius: "5px" }}
              >
                Finished
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default HistoryCard;
