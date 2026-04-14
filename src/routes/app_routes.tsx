import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/global/Loader";
import { useUserStore } from "../zustand/user.state";
// import SinglesRoutes from "./Singles.Route";
import CouplesRoutes from "./Couples.Route";
// import CouplesLayout from "../pages/couples/Layout";
import Modal from "../components/global/Modal";
import Toast from "../components/global/Toast";
import { useGetUser } from "../hooks/query/useUser";
import SocialFeedPage from "../pages/couples/Mentorship";
import ChatScreen from "../pages/general_dashboard/ChatScreen";
import Discover from "../pages/general_dashboard/Discover";
import Index from "../pages/general_dashboard/Index";
import MatchProfileScreen from "../pages/general_dashboard/MatchProfile";
import Messages from "../pages/general_dashboard/Messages";
import MySubscription from "../pages/general_dashboard/MySubscription";
import Notifications from "../pages/general_dashboard/Notifications";
import PostDetail from "../pages/general_dashboard/PostDetail";
import ProfileScreen from "../pages/general_dashboard/Profile";
import Settings from "../pages/general_dashboard/Settings";
import LandingPageIndex from "../pages/landing";
import About from "../pages/landing/About";
import Contact from "../pages/landing/Contact";
import LandingPageLayout from "../pages/landing/Layout";
import SinglesPageIndex from "../pages/singles/Index";
import LandingRoute from "./Landing.Route";
const CouplesLayout = lazy(() => import("../pages/couples/Layout"));

const AppRoutes = () => {
  const { isLoggedIn, user } = useUserStore();
  useGetUser();

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader className="h-25 w-25" />}>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={isLoggedIn && user?.marital_status ? "/dashboard" : "/"}
                  replace
                />
              }
            />

            {/* Protected Routes - Dashboard */}
            <Route path="/dashboard/*" element={<CouplesRoutes />}>
              <Route element={<CouplesLayout />}>
                <Route
                  index
                  element={
                    user?.marital_status === "married" ? (
                      <Index />
                    ) : (
                      <SinglesPageIndex />
                    )
                  }
                />
                <Route path="settings" element={<Settings />} />
                <Route path="discover" element={<Discover />} />
                <Route path="messages" element={<Messages />} />
                <Route
                  path="messages/:receiver/chat/:conversation_id"
                  element={<ChatScreen />}
                />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<ProfileScreen />} />
                <Route
                  path="matchprofile/:id"
                  element={<MatchProfileScreen />}
                />
                <Route path="mentorship" element={<SocialFeedPage />} />
                <Route path="mentorship/post/:id" element={<PostDetail />} />
                <Route path="my-subscription" element={<MySubscription />} />
              </Route>
            </Route>
            {/* Landing Route */}
            <Route path="/" element={<LandingRoute />}>
              <Route element={<LandingPageLayout />}>
                <Route index element={<LandingPageIndex />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
        <Toast />
        <Modal />
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
