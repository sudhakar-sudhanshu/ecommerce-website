import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter() {
  const token = localStorage.getItem("access");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRouter;
