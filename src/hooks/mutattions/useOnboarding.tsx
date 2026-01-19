import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useToast } from "../../zustand/toast.state";
import { onboardingUpdateUserProfile } from "../../services/endpoints";

const { showToast } = useToast.getState();
export const useOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: onboardingUpdateUserProfile,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
    },
    onError: (error: AxiosError<RegisterError>) => {
      // Check if this is an Axios error with response data
      if (error.response?.data?.errors) {
        const errorData = error.response.data.errors;

        // Get all error messages
        const errorMessages: string[] = [];

        if (errorData.username?.[0]) {
          errorMessages.push(errorData.username[0]);
        }
        if (errorData.email?.[0]) {
          errorMessages.push(errorData.email[0]);
        }
        if (errorData.password?.[0]) {
          errorMessages.push(errorData.password[0]);
        }

        // Show all errors in a single toast or multiple toasts
        if (errorMessages.length > 0) {
          // Option 1: Show first error only (cleaner UI)
          showToast(errorMessages[0], "error");

          // Option 2: Show all errors in one toast
          // showToast(errorMessages.join(". "), "error");

          // Option 3: Show each error in separate toasts (not recommended for multiple errors)
          // errorMessages.forEach(msg => showToast(msg, "error"));
        } else {
          showToast(
            "User update failed. Please check your information.",
            "error"
          );
        }
      }
      // Handle 400 Bad Request with different structure
      else if (error.response?.data?.error) {
        showToast(error.response.data.error, "error");
      }
      // Handle network errors
      else if (error.request) {
        showToast(
          "Network error. Please check your connection and try again.",
          "error"
        );
      }
      // Handle any other errors
      else {
        showToast("User update failed. Please try again later.", "error");
      }
    },
  });
};
