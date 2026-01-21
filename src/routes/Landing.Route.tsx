import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/user.state";

const LandingRoute = () => {
  const { isLoggedIn, user } = useUserStore();
  if (isLoggedIn && user?.marital_status) {
    // if (user.marital_status === "married") {
    //   return <Navigate to="/couples" replace />;
    // }
    // if (user.marital_status === "single") {
    //   return <Navigate to="/singles" replace />;
    // }
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default LandingRoute;
