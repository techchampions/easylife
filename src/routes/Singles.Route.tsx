import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/user.state";

const SinglesRoutes = () => {
  const { isLoggedIn, user } = useUserStore();

  // Redirect UNAUTHENTICATED users to login with return URL
  if (isLoggedIn && user?.role) {
    if (user.role === 1) {
      return <Outlet />;
    }
    return <Navigate to="/couples" replace />;
  }
  return <Navigate to="/" replace />;
};

export default SinglesRoutes;
