import React from "react";
import {
  User,
  Lock,
  CreditCard,
  Shield,
  FileText,
  HelpCircle,
  Trash2,
  LogOut,
} from "lucide-react";
import Header from "../../components/global/Header";
// import { useModal } from "../../zustand/modal.state";
// import UpdateProfile from "../../components/general_dating/UpdateProfile";

const Settings = () => {
  // const modal = useModal();
  const menuItems = [
    {
      icon: User,
      label: "Edit Profile",
      color: "text-gray-700",
      // onclick: modal.open(<UpdateProfile />),
    },
    { icon: Lock, label: "Update Password", color: "text-gray-700" },
    { icon: CreditCard, label: "My Subscription", color: "text-gray-700" },
    { icon: Shield, label: "Privacy", color: "text-gray-700" },
    { icon: FileText, label: "Terms and Policies", color: "text-gray-700" },
    { icon: HelpCircle, label: "Help & Support", color: "text-gray-700" },
    {
      icon: Trash2,
      label: "Delete Your Account",
      color: "text-red-600",
      dividerAbove: true,
    },
    { icon: LogOut, label: "Log out", color: "text-gray-700" },
  ];

  return (
    <div className="min-h-screen">
      <Header name="Settings" />
      <div className="mx-auto">
        <div className="bg-white rounded-2xl p-10">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.dividerAbove && (
                <div className="border-t border-gray-200" />
              )}
              <button
                // onClick={() => item.onclick}
                className="w-full px-6 py-5 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
              >
                <item.icon
                  className={`w-6 h-6 ${item.color}`}
                  strokeWidth={1.5}
                />
                <span className={`text-sm font-medium ${item.color}`}>
                  {item.label}
                </span>
              </button>
              {index < menuItems.length - 1 && !item.dividerAbove && (
                <div className="border-t border-gray-100 mx-6" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
