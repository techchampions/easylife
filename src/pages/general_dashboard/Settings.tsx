import React from "react";
import {
  User,
  Lock,
  CreditCard,
  // Shield,
  // FileText,
  HelpCircle,
  Trash2,
  LogOut,
} from "lucide-react";
import Header from "../../components/global/Header";
import { useModal } from "../../zustand/modal.state";
import UpdateProfile from "../../components/general_dating/UpdateProfile";
import UpdatePassword from "../../components/general_dating/UpdatePassword";
import DeleteAccount from "../../components/general_dating/DeleteAccount";
import { useLogout } from "../../hooks/mutattions/useAuth";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const modal = useModal();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const menuItems = [
    {
      icon: User,
      label: "Edit Profile",
      color: "text-gray-700",
      onclick: () => {
        modal.open(<UpdateProfile />);
      },
    },
    {
      icon: Lock,
      label: "Update Password",
      color: "text-gray-700",
      onclick: () => modal.open(<UpdatePassword />),
    },
    {
      icon: CreditCard,
      label: "My Subscription",
      color: "text-gray-700",
      onclick: () => navigate("/dashboard/my-subscription"),
    },
    // { icon: Shield, label: "Privacy", color: "text-gray-700" },
    // { icon: FileText, label: "Terms and Policies", color: "text-gray-700" },
    { icon: HelpCircle, label: "Help & Support", color: "text-gray-700" },
  ];
  const accountItems = [
    {
      icon: Trash2,
      label: "Delete Your Account",
      color: "text-red-600",
      onclick: () => modal.open(<DeleteAccount />),
    },
    {
      icon: LogOut,
      label: "Log out",
      color: "text-gray-700",
      onclick: () => logout(),
    },
  ];

  return (
    <div className="min-h-screen">
      <Header name="Settings" />
      <div className="mx-auto p-3 md:p-0 space-y-4">
        <div className="bg-white rounded-2xl p-10">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <button
                onClick={item.onclick}
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
              {index < menuItems.length - 1 && (
                <div className="border-t border-gray-100 mx-6" />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-10">
          {accountItems.map((item, index) => (
            <React.Fragment key={index}>
              <button
                onClick={item.onclick}
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
              {index < accountItems.length - 1 && (
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
