import { useEffect, useContext, useState } from "react";

import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Modal,
  Table,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "react-query";

// State Management
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";

// Assets
import actionSuccess from "../../assets/svg/action-success.svg";
import actionCancel from "../../assets/svg/action-cancel.svg";

// Dummy data
import { dummyIncome } from "../../utils/data";

// Animations
import { pageInit } from "../../utils/animVariants";

// API
import { API, setAuthToken } from "../../utils/api";

function IncomePage() {
  const history = useHistory();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const { id } = userState.loggedUser;

  const { data: IncomeData, loading, error, refetch } = useQuery(
    "incomeCache",
    async () => {
      setAuthToken(localStorage.token);
      const response = await API.get(`/transactions/${id}`);
      return response.data;
    }
  );

  // const [incomeList, setIncomeList] = useState([]);

  useEffect(() => {
    userState.loggedUser.role !== "partner" && history.push("/");
    // setIncomeList()
  }, []);

  // useEffect(() => {
  //   const filteredIncome = cartState.transactions.filter(
  //     (income) => income.restaurant.title == userState.loggedUser.fullname
  //   );
  //   setIncomeList(filteredIncome);
  // }, [cartState.transactions]);

  /**
   *
   * status :
   * - 0 for "Cancel"
   * - 1 for "Waiting Approve"
   * - 2 for "On The Way"
   * - 3 for "Success"
   */
  const handleStatus = (status) => {
    switch (status) {
      case "cancel":
        return <p className="text-danger">Cancel</p>;
        break;
      case "waiting":
        return <p className="text-warning">Waiting Approve</p>;
        break;
      case "otw":
        return <p className="text-info">On The Way</p>;
        break;
      case "success":
        return <p className="text-success">Success</p>;
        break;

      default:
        break;
    }
  };
  const handleAction = (status) => {
    switch (status) {
      case "cancel":
        return <img src={actionCancel} height="20" alt="cancel action" />;
        break;
      case "waiting":
        return (
          <div>
            <Button size="sm" variant="danger" className="mr-0 mr-lg-2">
              Cancel
            </Button>
            <Button size="sm" variant="success">
              Approve
            </Button>
          </div>
        );
        break;
      case "otw":
        return <img src={actionSuccess} height="20" alt="success action" />;
        break;
      case "success":
        return <img src={actionSuccess} height="20" alt="success action" />;
        break;

      default:
        break;
    }
  };
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
          <Col xs={12}>
            <h1 className="heading font-weight-bold">Income Transaction</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className="table-responsive-xs">
            <div className="table-responsive">
              <Table
                bordered
                style={{ backgroundColor: "white", borderColor: "#828282" }}
                className="overflow-auto"
              >
                <thead style={{ backgroundColor: "#E5E5E5" }}>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Products Order</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {IncomeData?.data?.transactions.map((income, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{income.userOrder.fullName}</td>
                      <td>{income.userOrder.location}</td>
                      <td>
                        <div
                          style={{
                            width: "200px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {/* {`${income.listProducts}, `} */}
                        </div>
                      </td>
                      <td className="text-center">
                        {handleStatus(income.status)}
                      </td>
                      <td className="text-center">
                        {handleAction(income.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default IncomePage;
