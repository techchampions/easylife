import { Bell } from "lucide-react";
import React from "react";
import ItemMessagePlaceholder from "../../components/general_dating/ItemMessagePaceholder";
import NotifcationsList from "../../components/general_dating/NotifcationsList";
import Header from "../../components/global/Header";
import { useGetNotifications } from "../../hooks/query/useUser";

const Notifications: React.FC = () => {
  const { data, isLoading, isError } = useGetNotifications();
  return (
    <div>
      <Header name="Notifications" />
      <div className="p-3 md:p-0">
        {data?.users && data.users.length > 0 ? (
          <NotifcationsList
            notifications={data?.users || []}
            isError={isError}
            isLoading={isLoading}
          />
        ) : (
          <ItemMessagePlaceholder
            icon={<Bell />}
            title="No Notifications yet"
            message="You don't have any notification at the moment."
          />
        )}
      </div>
    </div>
  );
};

export default Notifications;
