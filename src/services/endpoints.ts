import api from "./api.service";

export const login = async (payload: LoginPayload) => {
  const formData = new FormData();
  if (payload.email !== undefined)
    formData.append("email", payload.email.toString());
  if (payload.password !== undefined)
    formData.append("password", payload.password.toString());

  const response = await api.post("/login", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
export const register = async (payload: RegisterPayload) => {
  const formData = new FormData();
  if (payload.email !== undefined)
    formData.append("email", payload.email.toString());
  if (payload.password !== undefined)
    formData.append("password", payload.password.toString());

  const response = await api.post("/register", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getUser = async (): Promise<any> => {
  const response = await api.get("/user-info");
  return response.data;
};

export const verifyOTP = async (otp: number | string) => {
  const payload = new FormData();
  if (otp !== undefined) payload.append("otp", otp.toString());

  const response = await api.post("/verify-otp", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const onboardingUpdateUserProfile = async (payload: FormData) => {
  const response = await api.post("/update-user-auth", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
