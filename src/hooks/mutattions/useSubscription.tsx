import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import BasicInfo from "../../components/auth/BasicInfo";
import api from "../../services/api.service";
import { useModal } from "../../zustand/modal.state";
import { useToast } from "../../zustand/toast.state";
const { showToast } = useToast.getState();
const modal = useModal.getState();
export const useInitialPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: InitializePaymentPayload
    ): Promise<InitializePaymentResponse> => {
      const res = await api.post(`/payment/initialize`, payload);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      const message = data.message || "Initialized payment";
      showToast(message, "success");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // Handle any other

      const message = error.response?.data.message || "Failed to initialize";
      showToast(message, "error");
    },
  });
};
export const useWalletPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: InitializePaymentPayload
    ): Promise<InitializePaymentResponse> => {
      const res = await api.post(`/wallet/pay`, payload);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      if (data.success) {
        const message = data.message || "Initialized payment";
        showToast(message, "success");
        modal.open(<BasicInfo />);
      } else {
        showToast(data.message, "error");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // Handle any other

      const message = error.response?.data.message || "Failed to initialize";
      showToast(message, "error");
    },
  });
};
export const useRenewSubWithWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: InitializePaymentPayload
    ): Promise<InitializePaymentResponse> => {
      const res = await api.post(`/wallet/pay`, payload);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      if (data.success) {
        const message = data.message || "Initialized payment";
        showToast(message, "success");
      } else {
        showToast(data.message, "error");
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // Handle any other

      const message = error.response?.data.message || "Failed to initialize";
      showToast(message, "error");
    },
  });
};
