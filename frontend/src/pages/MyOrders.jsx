import { useEffect, useState } from "react";
import { authFetch } from "../utils/auth";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    authFetch(`${BASEURL}/api/orders/`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="pt-24 text-center">Loading orders...</div>;
  }

  return (
    <div className="pt-24 min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-linear-to-r from-indigo-500 to-purple-600 p-4 rounded shadow text-white"

            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">
                  Order #{order.order_id}
                </span>
                <span className="text-gray-600">
                  ₹{order.total_amount}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                {new Date(order.created_at).toLocaleString()}
              </p>

              <ul className="text-sm list-disc pl-5">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.product} × {item.quantity} — ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
