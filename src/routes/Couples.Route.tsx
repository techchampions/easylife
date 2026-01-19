import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/user.state";

const CouplesRoutes = () => {
  const { isLoggedIn, user } = useUserStore();

  // Redirect UNAUTHENTICATED users to login with return URL
  if (isLoggedIn && user?.role) {
    if (user.role === 0) {
      return <Outlet />;
    } else {
      return <Navigate to="/singles" replace />;
    }
  } else return <Navigate to="/" replace />;
};

export default CouplesRoutes;
