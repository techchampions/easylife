import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import ChangePassword from "../../components/auth/ChangePassword";
import GetStarted from "../../components/auth/GetStarted";
import Login from "../../components/auth/Login";
import VerifyEmail from "../../components/auth/VerifyEmail";
import {
  changePassword,
  forgotPassword,
  login,
  register,
  sendOTP,
  verifyOTP,
  verifyReferalCode,
} from "../../services/endpoints";
import { useModal } from "../../zustand/modal.state";
import { useToast } from "../../zustand/toast.state";
import { useUserStore } from "../../zustand/user.state";

const { showToast } = useToast.getState();
const modal = useModal.getState();
const { setUser, setIsLoggedIn, setToken } = useUserStore.getState();
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      // const username = response.user.first_name || response.user.username;
      // setUser(response.user);
      if (response.success) {
        setToken(response.token);
        setIsLoggedIn(true);
        if (response.otpVerified && response.profileCompleted) {
          showToast(response.message, "success");
          modal.close();
        } else {
          if (response.otpVerified === false) {
            showToast(`welcome back, Please verify your email`, "info");
            modal.open(<VerifyEmail shouldAutoSend={true} />);
          } else if (response.profileCompleted === false) {
            showToast(`welcome back, Please complete your profile`, "info");
            modal.open(<GetStarted />);
          }
        }
      } else {
        showToast(response.message, "error");
      }
    },
    onError: (error: AxiosError<LoginError>) => {
      // Check if this is an Axios error with response data
      if (error.response) {
        const errorData = error.response.data;
        // Use the error message from the response
        const errorMessage = errorData.message || "Login failed";
        if (errorData.token) {
          setToken(errorData.token);
        }
        showToast(errorMessage, "error");
        if (errorData.otpVerified === false) {
          modal.open(<VerifyEmail />);
        } else if (errorData.profileCompleted === false) {
          modal.open(<GetStarted />);
        }
      } else {
        // Handle non-Axios errors or network errors
        showToast("Loggin Failed!... try again later", "error");
      }
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      showToast(response.message || "Registered successfully", "success");
      setUser(response.user);
      setIsLoggedIn(true);
      setToken(response.token);
      modal.open(<VerifyEmail />);
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
            "Registration failed. Please check your information.",
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
        showToast("Registration failed. Please try again later.", "error");
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
export const logout = async () => {
  useUserStore.getState().reset(); // Reset user store
  localStorage.removeItem("user-state"); // Clear persisted user state
  window.location.reload(); // Optional: Refresh page to clear UI state
  showToast("Logged out successfully!", "success"); // Show logout success message
};
export const useSendOTP = () => {
  return useMutation({
    mutationFn: sendOTP,
    onSuccess() {
      showToast("OTP sent to your email", "success");
    },
    onError() {
      showToast("Failed to send OTP... try resending", "error");
    },
  });
};
export const useVerifyOTP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      if (data.success) {
        showToast(data.message, "success");
        modal.open(<GetStarted />);
      } else {
        showToast(data.message, "error");
      }
    },
    onError: (error: AxiosError<RegisterError>) => {
      showToast("failed otp verification", "error");
      console.log(error);
    },
  });
};

export const useForgotPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      showToast(`OTP sent to your email`, "success");
      modal.open(<ChangePassword />);
    },
    onError: (error: AxiosError<ForgotPasswordError>) => {
      if (error.response) {
        showToast(error.response?.data.message, "error");
      } else showToast("Failed to send OTP", "error");
    },
  });
};
export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      showToast(`Password changed successfully`, "success");
      modal.open(<Login />);
    },
    onError: (error: AxiosError<ForgotPasswordError>) => {
      if (error.response) {
        showToast(error.response?.data.message, "error");
      } else showToast("Failed to change password", "error");
    },
  });
};

export const useVerifyReferalCode = () => {
  return useMutation({
    mutationFn: verifyReferalCode,
  });
};
