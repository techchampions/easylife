import Button from "../global/Button";
import { useModal } from "../../zustand/modal.state";
import Login from "./Login";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Signup from "./Signup";

const Welcome = () => {
  const modal = useModal();
  return (
    <div className="space-y-3 flex flex-col px-4 w-md max-w-sm md:max-w-md">
      <div className="">
        <img src="/images/intro.png" alt="" className="w-[55%] mx-auto" />
        <div className="pb-4 text-center">
          <h1 className="font-medium text-3xl text-black">
            Welcome to EasyLife Marriage Mentorship
          </h1>
        </div>
      </div>
      {/* Render based on state */}
      <Button
        onClick={() => modal.open(<Signup />)}
        label="Create with Email"
        icon={<Mail />}
        className="py-2 rounded-full! mt-2 bg-secondary hover:bg-secondary/80 w-fit! px-8 mx-auto"
      />
      {/* Link to switch between forms */}
      <div className="">
        <p className="text-sm flex gap-1 items-center text-center justify-center">
          <>
            Already have an account?{" "}
            <Button
              label="Login"
              className=" ml-1 bg-transparent! text-secondary! font-medium w-fit! underline"
              onClick={() => modal.open(<Login />)}
            />
          </>
        </p>
        <div className="flex items-center text-xs text-primary gap-2 justify-center">
          <Link to={`/terms`} className="hover:underline">
            Terms of Use
          </Link>
          <Link to={`/privacy`} className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
