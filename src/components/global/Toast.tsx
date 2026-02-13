import { useEffect } from "react";
import { useToast } from "../../zustand/toast.state";
import { CheckCircle2, Info, MessageSquare, X } from "lucide-react";

const Toast = ({ duration = 5000 }) => {
  const { show, message, type, hideToast } = useToast();

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      hideToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, hideToast]);

  if (!show) return null;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 flex items-center w-[90%] max-w-[90%] md:w-sm md:max-w-sm p-2 text-gray-500 bg-white rounded-xl shadow-lg transition-transform animate-slideInRight z-90">
      <div
        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg p-2 ${
          type === "success"
            ? "text-green-500 bg-green-100"
            : type === "error"
            ? "text-red-500 bg-red-100"
            : type === "message"
            ? "bg-secondary/10 text-secondary"
            : "text-blue-500 bg-blue-100"
        }`}
      >
        {type === "success" ? (
          <CheckCircle2 size={20} />
        ) : type === "message" ? (
          <MessageSquare size={20} />
        ) : (
          <Info size={20} />
        )}
      </div>
      <div className="ml-3 text-sm font-medium text-left">{message}</div>
      <button
        type="button"
        className="ml-auto bg-transparent text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5"
        onClick={hideToast}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
