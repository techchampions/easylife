import React from "react";
import Header from "../../components/global/Header";
import ItemMessagePlaceholder from "../../components/general_dating/ItemMessagePaceholder";
import { Bell } from "lucide-react";

const Notifications: React.FC = () => {
  return (
    <div>
      <Header name="Notifications" />
      <div className="">
        <ItemMessagePlaceholder
          title="No notifications found"
          message="You don't have any notifications at the moment."
          icon={<Bell />}
        />
      </div>
    </div>
  );
};

export default Notifications;
