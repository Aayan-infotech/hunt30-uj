import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./detail.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { TiMessageTyping } from "react-icons/ti";
import ChatBox from "./chatBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Detail() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const orderId = localStorage.getItem("orderID");
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://www.taxidermyvendor.hunt30.com/api/searchOrder/${orderId}`
        );
        setOrder(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const getStepStatus = (orderStatus, step) => {
    const statusOrder = ["pending", "shipped", "delivered"];
    const currentIndex = statusOrder.indexOf(orderStatus);
    const stepIndex = statusOrder.indexOf(step);
    return stepIndex <= currentIndex ? "completed" : "active";
  };

  if (loading)
    return (
      <div className="detail">
        <div className="container p-0">
          <div className="center">
            <h1 className="text-light">Loading...</h1>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div>
        {order ? (
          <div className="detail">
            <div className="container p-0">
              <div className="center">
                <div className="card mw-100">
                  <div className="between my-3">
                    <h2 className="text-light text-center w-95">
                      Order Details
                    </h2>
                    <div className="welcome-p">
                      <button
                        onClick={handleOpen}
                        style={{ padding: "5px 10px", width: "100%" }}
                      >
                        <TiMessageTyping />
                      </button>
                    </div>
                  </div>

                  <div className="between">
                    <p>Booking Id: {order.bookingId}</p>
                    <p>Confirmation Id: {order.confirmationId}</p>
                  </div>
                  <div className="between my-3">
                    <p>Total Price: ${order.totalAmount}</p>
                    <p>Payment Status: {order.paymentStatus}</p>
                    <p>Due Amount: ${order.dueAmount}</p>
                    <p>Paid Amount: ${order.paidAmount}</p>
                  </div>

                  {/* Payment History Toggle */}
                  <div>
                    <h2
                      className="text-light d-flex align-items-center cursor-pointer"
                      onClick={() => setShowTable(!showTable)}
                      style={{ cursor: "pointer" }}
                    >
                      Payment History{" "}
                      {showTable ? (
                        <IoIosArrowUp className="ms-2" />
                      ) : (
                        <IoIosArrowDown className="ms-2" />
                      )}
                    </h2>

                    {showTable && (
                      <table
                        className="table mt-2 w-85"
                        style={{ margin: "auto" }}
                      >
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Mode</th>
                            <th>Paid Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.paymentHistory.map((payment, index) => (
                            <tr key={index}>
                              <td>
                                {new Date(payment.date).toLocaleDateString()}
                              </td>
                              <td style={{ textTransform: "capitalize" }}>
                                {payment.paymentMethod}
                              </td>
                              <td>{payment.amount ?? "00"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="between my-3">
                    <p>Shop Name: {order.shopName}</p>
                    <p>Shop Address: {order.shopAddress}</p>
                  </div>

                  <h2 className="text-light">Customer Detail</h2>
                  <div className="between">
                    <p>Customer Name: {order.userName}</p>
                    <p>Email: {order.userEmail}</p>
                    <p>Phone No: {order.userContact}</p>
                    <p>Delivery Address: {order.deliveryAddress}</p>
                  </div>
                  <div className="between">
                    <div className="w-85">
                      <div className="stepper-wrapper ">
                        <div
                          className={`stepper-item ${getStepStatus(
                            order.status,
                            "pending"
                          )}`}
                        >
                          <div className="step-counter"></div>
                          <div className="step-name">Processing</div>
                        </div>
                        <div
                          className={`stepper-item ${getStepStatus(
                            order.status,
                            "shipped"
                          )}`}
                        >
                          <div className="step-counter"></div>
                          <div className="step-name">In Progress</div>
                        </div>
                        <div
                          className={`stepper-item ${getStepStatus(
                            order.status,
                            "delivered"
                          )}`}
                        >
                          <div className="step-counter"></div>
                          <div className="step-name">Completed</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      {show === false ? (
                        <>
                          <input
                            type="radio"
                            id="show"
                            name="shippingDetail"
                            value="show"
                            checked={show}
                            onChange={() => setShow(true)}
                          />
                          <label htmlFor="show" className="text-light mx-2">
                            Show
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            type="radio"
                            id="hide"
                            name="shippingDetail"
                            value="hide"
                            checked={!show}
                            onChange={() => setShow(false)}
                          />
                          <label htmlFor="hide" className="text-light mx-2">
                            Hide
                          </label>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Shipping Detail */}
                  {show ? (
                    <div className="stepper-wrapper ">
                      <div
                        className={`stepper-item ${getStepStatus(
                          order.status,
                          "pending"
                        )}`}
                      >
                        <div className="step-counter"></div>
                        <div className="step-name">Order Recieved</div>
                      </div>
                      <div
                        className={`stepper-item ${getStepStatus(
                          order.status,
                          "shipped"
                        )}`}
                      >
                        <div className="step-counter"></div>
                        <div className="step-name">In Production</div>
                      </div>
                      <div
                        className={`stepper-item ${getStepStatus(
                          order.status,
                          "shipped"
                        )}`}
                      >
                        <div className="step-counter"></div>
                        <div className="step-name">Detail Work</div>
                      </div>
                      <div
                        className={`stepper-item ${getStepStatus(
                          order.status,
                          "delivered"
                        )}`}
                      >
                        <div className="step-counter"></div>
                        <div className="step-name">Trophy Completed</div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="welcome-p">
                <button onClick={() => navigate("/")} className="w-100">
                  Home Page
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Order not found</p>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ChatBox onClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </>
  );
}
