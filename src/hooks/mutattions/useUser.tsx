import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api.service";
import { useToast } from "../../zustand/toast.state";

const { showToast } = useToast.getState();
export const useUpdateMaritalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { marital_status: string }) => {
      const res = await api.post(`/update/marital-status`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      showToast("Marital status updated", "success");
    },
    onError: () => {
      // Handle any other errors
      showToast("update failed. Please try again later.", "error");
    },
  });
};
