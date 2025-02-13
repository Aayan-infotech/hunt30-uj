import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./detail.css";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://44.196.64.110:3002/api/searchOrder/${id}`
        );
        setOrder(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

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
    <div>
      {order ? (
        <div className="detail">
          <div className="container p-0">
            <div className="center">
              <div className="card mw-100">
                <h2 className="text-light">Order Details</h2>
                <div className="between">
                  <p>Order ID: {order.orderId}</p>
                  <p>Confirmation ID: {order.confirmationId}</p>
                  <p>Booking ID: {order.bookingId}</p>
                </div>
                <div className="between my-3">
                  <p>Total Price: {order.totalAmount}</p>
                  <p>Payment Status: {order.paymentStatus}</p>
                  <p>Due Amount: {order.dueAmount}</p>
                  <p>Paid Amount: {order.paidAmount}</p>
                </div>
                <h2 className="text-light">Payment History</h2>
                <table>
                  <tr>
                    <th>Date</th>

                    <th>Mode</th>
                    <th>Paid Amount</th>
                  </tr>

                  {order.paymentHistory.map((payment, index) => (
                    <tr key={index}>
                      <td>{new Date(payment.date).toLocaleDateString()}</td>

                      <td>{payment.paymentMethod}</td>
                      <td>{payment.amount ?? "00"}</td>
                    </tr>
                  ))}
                </table>
                <div className="between my-3">
                  <p>Shop Name: {order.shopName}</p>
                  <p>Shop Address: {order.shopAddress}</p>
                </div>
                <h2 className="text-light">Customer Detail</h2>
                <div className="between">
                  <p>Customer Name: {order.userName}</p>
                  <p>Email: {order.userEmail}</p>
                  <p>Phone No: {order.userContact}</p>
                  <p>Delievery Address: {order.deliveryAddress}</p>
                </div>
                <div
                  className="stepper-wrapper"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {order.status === "pending" ? (
                    <div className="stepper-item completed">
                      <div className="step-counter"></div>
                      <div className="step-name">Processing</div>
                    </div>
                  ) : (
                    <div className="stepper-item active">
                      <div className="step-counter"></div>
                      <div className="step-name">Processing</div>
                    </div>
                  )}
                  {order.status === "shipped" ? (
                    <div className="stepper-item completed">
                      <div className="step-counter"></div>
                      <div className="step-name">In Progress</div>
                    </div>
                  ) : (
                    <div className="stepper-item active">
                      <div className="step-counter"></div>
                      <div className="step-name">In Progress</div>
                    </div>
                  )}
                  {order.status === "confirmed" ? (
                    <div className="stepper-item completed">
                      <div className="step-counter"></div>
                      <div className="step-name">Completed</div>
                    </div>
                  ) : (
                    <div className="stepper-item active">
                      <div className="step-counter"></div>
                      <div className="step-name">Completed</div>
                    </div>
                  )}
                </div>
                {show ? (
                  <div className="stepper-wrapper">
                    {order.status === "pending" ? (
                      <div className="stepper-item completed">
                        <div className="step-counter"></div>
                        <div className="step-name">order recieved</div>
                      </div>
                    ) : (
                      <div className="stepper-item active">
                        <div className="step-counter"></div>
                        <div className="step-name">order recieved</div>
                      </div>
                    )}
                    {order.status === "shipped" ? (
                      <div className="stepper-item completed">
                        <div className="step-counter"></div>
                        <div className="step-name">In Production</div>
                      </div>
                    ) : (
                      <div className="stepper-item active">
                        <div className="step-counter"></div>
                        <div className="step-name">In Production</div>
                      </div>
                    )}
                    {order.status === "shipped" ? (
                      <div className="stepper-item completed">
                        <div className="step-counter"></div>
                        <div className="step-name">Detail Work</div>
                      </div>
                    ) : (
                      <div className="stepper-item active">
                        <div className="step-counter"></div>
                        <div className="step-name">Detail Work</div>
                      </div>
                    )}
                    {order.status === "confirmed" ? (
                      <div className="stepper-item completed">
                        <div className="step-counter"></div>
                        <div className="step-name">Trophy Completed</div>
                      </div>
                    ) : (
                      <div className="stepper-item active">
                        <div className="step-counter"></div>
                        <div className="step-name">Trophy Completed</div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="welcome-p">
              <button onClick={() => navigate("/")} className="w-100">Home Page</button>
            </div>
           
          </div>
        </div>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
}
