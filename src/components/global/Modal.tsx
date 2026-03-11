import { X } from "lucide-react";
import { useEffect } from "react";
import { useModal } from "../../zustand/modal.state";
const Modal = () => {
  const { isOpen, content, close, isCloseable } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isCloseable) {
      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, isCloseable, close]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-50"
      // onClick={close}
    >
      <div className="p-2">
        <div
          className="bg-white p-10 rounded-4xl shadow-lg w-fit md:max-w-200 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {isCloseable && (
            <button
              className="absolute top-4 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={close}
              aria-label="Close Modal"
            >
              <X size={24} />
            </button>
          )}
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
