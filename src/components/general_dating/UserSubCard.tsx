import { useUserStore } from "../../zustand/user.state";
import { CheckCircle, CircleOff, RefreshCw } from "lucide-react";
import Button from "../../components/global/Button";

const UserSubCard = () => {
  const { user } = useUserStore();
  const list = [
    "Relationship Coaching / Marriage Mentorship",
    " General Marriage Trainings",
    " Marriage Connections ",
    " Coordinated Godly Match Making ",
  ];

  return (
    <div className="bg-linear-to-tr from-primary to-black p-7 rounded-3xl">
      <div className="space-y-8 text-white flex flex-col">
        <div className="flex-1 space-y-4 md:flex md:items-center md:justify-between">
          <div className="">
            <div className="text-center">
              <div className="flex gap-4 justify-center">
                <div className="text-2xl font-semibold">
                  {user?.marital_status === "married" ? "Couples" : "Singles"}{" "}
                  Plan
                </div>
                <div className="bg-linear-to-r to-green-600/50 flex items-center justify-center text-green-500 px-4 text-sm rounded-lg">
                  Active
                </div>
              </div>
              <div className="">
                <div className="">Expires in 1 month</div>
                <div className="">From: 01 Feb 2026 - 04 Mar 2026</div>
              </div>
            </div>
            <div className="h-1 rounded-[100%] w-1/2 mx-auto bg-white/70 md:hidden mt-3" />
          </div>

          <ul className="space-y-3 p-2">
            {list.map((list, idx) => (
              <li key={idx} className="flex items-center-safe gap-2">
                {" "}
                <CheckCircle size={15} />
                <div className="flex-1 text-sm">{list}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex justify-end">
          <div className="grid grid-cols-3 gap-4 w-full md:w-2/3">
            <Button
              label="Cancel"
              className="bg-red-500"
              icon={<CircleOff size={15} />}
            />
            <Button
              label="Renew at $60"
              className="bg-white text-primary! col-span-2"
              icon={<RefreshCw size={15} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSubCard;
