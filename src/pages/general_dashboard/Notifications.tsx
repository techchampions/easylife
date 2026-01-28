import React from "react";
import Header from "../../components/global/Header";
import { useGetNotifications } from "../../hooks/query/useUser";
import NotifcationsList from "../../components/general_dating/NotifcationsList";

const Notifications: React.FC = () => {
  const { data, isLoading, isError } = useGetNotifications();
  return (
    <div>
      <Header name="Notifications" />
      <div className="px-4 md:px-0">
        <NotifcationsList
          notifications={data?.users || []}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Notifications;
