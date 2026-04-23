import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage, startCounsellingSession } from "../../services/endpoints";
import { useToast } from "../../zustand/toast.state";

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
export const useStartCounsellingSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startCounsellingSession,
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
