import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import api from "../../services/api.service";
import { useToast } from "../../zustand/toast.state";
const { showToast } = useToast.getState();
export const useInitialPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: InitializePaymentPayload) => {
      const res = await api.post(`/payment/initialize`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      showToast("Initialized payment", "success");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // Handle any other

      const message = error.response?.data.message || "Failed to initialize";
      showToast(message, "error");
    },
  });
};
