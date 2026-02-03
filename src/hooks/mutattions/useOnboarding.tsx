import { useMutation, useQueryClient } from "@tanstack/react-query";
// import type { AxiosError } from "axios";
import { useToast } from "../../zustand/toast.state";
import { onboardingUpdateUserProfile } from "../../services/endpoints";

const { showToast } = useToast.getState();
export const useOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: onboardingUpdateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      showToast("User Profile updated", "success");
    },
    onError: () => {
      // Handle any other errors
      showToast("User update failed. Please try again later.", "error");
    },
  });
};
