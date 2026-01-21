import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../zustand/toast.state";
import { sendMessage } from "../../services/endpoints";

const { showToast } = useToast.getState();
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
    onError: () => {
      // Handle any other errors
      showToast("Message not sent", "error");
    },
  });
};
