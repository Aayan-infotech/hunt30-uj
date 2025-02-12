import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://44.196.64.110:3002/api/searchOrder/${id}`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {order ? (
        <div>
          <h2>Order Details</h2>
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Customer: {order.customerName}</p>
          {/* Add more order details here */}
        </div>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
}
