import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

// State Management
import { CartContext } from "../../../Context/CartContext";
import { UserContext } from "../../../Context/UserContext";

import { setAuthToken, API } from "../../../Config/API";

import { Container, Col, Row, Form, Button, Modal, Table } from "react-bootstrap";
import styles from "./IncomeTransaction.module.css";

export default function IncomeTransaction() {
   const navigate = useNavigate();
   const { state: userState, dispatch: userDispatch } = useContext(UserContext);
   const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

   const { id } = userState.loggedUser;

   const {
      data: IncomeData,
      loading,
      error,
      refetch,
   } = useQuery("incomeCache", async () => {
      setAuthToken(localStorage.token);
      const response = await API.get(`/transaction/${id}`);
      return response.data;
   });

   useEffect(() => {
      userState.loggedUser.role !== "Partner" && navigate("/");
   }, []);

   const approve = useMutation(async (payload) => {
      const config = {
         headers: {
            "Context-Type": "application/json",
         },
      };
      const body = {
         status: payload.status,
      };
      setAuthToken(localStorage.token);

      const response = await API.patch(`/transaction/${payload.id}`, body, config);
      console.log(response.data);
      refetch();
   });

   const handleApprove = (id, status) => {
      approve.mutate({ id, status });
   };

   const handleAction = (id, status) => {
      switch (status) {
         case "cancel":
            return (
               <>
                  <td className="text-center">
                     <p className="text-danger">Cancel</p>
                  </td>
                  <td className="text-center">
                     <img src="" alt="cancel" height="20" />
                  </td>
               </>
            );
            break;
         case "waiting":
            return (
               <>
                  <td className="text-center">
                     <p className="text-danger">Waiting Approve</p>
                  </td>
                  <td className="text-center">
                     <div>
                        <button
                           onClick={() => handleApprove(id, "cancel")}
                           className="mr-2 mr-lg-2"
                           size="sm"
                           variant="danger"
                        >
                           Cancel
                        </button>
                        <button
                           onClick={() => handleApprove(id, "otw")}
                           className="mr-2 mr-lg-2"
                           size="sm"
                           variant="success"
                        >
                           Approve
                        </button>
                     </div>{" "}
                  </td>
               </>
            );
            break;
         case "otw":
            return (
               <>
                  <td className="text-center">
                     <p className="text-danger">On The Way</p>
                  </td>
                  <td className="text-center">
                     <img src="" alt="success" height="20" />
                  </td>
               </>
            );
            break;
         case "success":
            return (
               <>
                  <td className="text-center">
                     <p className="text-danger">Completed</p>
                  </td>
                  <td className="text-center">
                     <img src="" alt="completed" height="20" />
                  </td>
               </>
            );
         default:
            break;
      }
   };
   return (
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

                              {handleAction(income.id, income.status)}
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               </div>
            </Col>
         </Row>
      </Container>
   );
}
