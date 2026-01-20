import { useEffect } from "react";
import { useModal } from "../../zustand/modal.state";
import { X } from "lucide-react";
const Modal = () => {
  const { isOpen, content, closeModal } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-50"
      // onClick={closeModal}
    >
      <div
        className="bg-white p-10 rounded-[25px] shadow-lg w-fit md:max-w-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
          onClick={closeModal}
          aria-label="Close Modal"
        >
          <X size={24} />
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
