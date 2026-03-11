import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { clearTokens, getAccessToken } from "../utils/auth.js";
import { useState } from "react";

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    clearTokens();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50">
      
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold text-white">
        🛍️ SUDHAKAR SHOP
      </Link>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          window.dispatchEvent(
            new CustomEvent("product-search", {
              detail: e.target.value,
            })
          );
        }}
        className="px-3 py-1 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-white"
      />

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* CART */}
        <Link to="/cart" className="relative text-white hover:text-gray-200 font-medium">
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2">
              {cartCount}
            </span>
          )}
        </Link>

        {/* LOGIN / SIGNUP (only when logged out) */}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="text-white hover:text-gray-200 font-medium">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:text-gray-200 font-medium">
              Sign Up
            </Link>
          </>
        )}

        {/* THREE DOT MENU (only when logged in) */}
        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="text-2xl px-2 text-white"
            >
              ⋮
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
                <Link
                  to="/orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  My Orders
                </Link>

                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
