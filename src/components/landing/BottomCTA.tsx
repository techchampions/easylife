import { useModal } from "../../zustand/modal.state";
import Welcome from "../auth/Welcome";
import Button from "../global/Button";

const BottomCTA = () => {
  const modal = useModal();
  return (
    <div className="min-w-full md:max-w-3xl 2xl:max-w-5xl">
      <div className="bg-secondary/20 p-10 rounded-2xl flex items-end gap-4">
        <div className="text-sm md:text-lg 2xl:text-3xl w-3/5">
          If You Really Wish To Get Married Easily, Stay Married, And Enjoy Your
          Marriage To The Full.
        </div>
        <Button
          onClick={() => modal.open(<Welcome />)}
          label="Join us now"
          className="2xl:text-2xl bg-linear-to-r from-secondary to-secondary-light text-white! w-2/5! h-fit!"
        />
      </div>
    </div>
  );
};

export default BottomCTA;
