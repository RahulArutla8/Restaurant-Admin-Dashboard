import { useEffect, useState } from "react";
import axios from "axios";
import "./OrdersPage.css";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      let url = `http://localhost:5000/api/orders?page=${page}&limit=5`;

      if (statusFilter) {
        url = `http://localhost:5000/api/orders?status=${statusFilter}&page=${page}&limit=5`;
      }

      const res = await axios.get(url);
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, page]);

  // UPDATE ORDER STATUS
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/orders/${id}/status`,
        { status: newStatus }
      );
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  // TOGGLE DETAILS
  const toggleDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  return (
    <div className="orders-page">
      <h1 className="orders-title">Orders Dashboard</h1>

      {/* FILTER */}
      <div className="orders-filter-bar">
        <select
          className="orders-select"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* LIST */}
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h3 className="order-title">Order #{order.orderNumber}</h3>

              <p className="order-info">Customer: {order.customerName}</p>
              <p className="order-info">Total: ₹{order.totalAmount}</p>

              {/* STATUS BADGE */}
              <p className="order-info">
                Status:
                <span
                  className={`status-badge ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </p>

              {/* STATUS DROPDOWN */}
              <select
                className="orders-select"
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {/* DETAILS BUTTON */}
              <button
                className="orders-btn"
                onClick={() => toggleDetails(order._id)}
              >
                {expandedOrder === order._id
                  ? "Hide Details"
                  : "View Details"}
              </button>

              {/* DETAILS */}
              {expandedOrder === order._id && (
                <div className="order-details">
                  <h4>Items</h4>
                  {order.items.map((item) => (
                    <p key={item._id}>
                      {item.menuItem.name} × {item.quantity} — ₹{item.price}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="orders-pagination">
        <button
          className="orders-btn"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          className="orders-btn"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OrdersPage;
