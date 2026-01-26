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

export const getUser = async (): Promise<GetUserResponse> => {
  const response = await api.get("/user-profile");
  return response.data;
};
export const getUserByID = async (
  id: number | string
): Promise<GetUserBYIDResponse> => {
  const response = await api.get(`/user-profile/${id}`);
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
export const sendOTP = async () => {
  const response = await api.post("/resend-otp", {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const onboardingUpdateUserProfile = async (payload: FormData) => {
  const response = await api.post("/update-user-auth", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getAllUsers = async (page: number): Promise<AllUsersResponse> => {
  const response = await api.get(`/user-info?page=${page}`);
  return response.data;
};

export const filterUsers = async (
  // page: number,
  filters: UserFilterParams = {} // Use the defined type
) => {
  const params = new URLSearchParams({
    // page: String(page),
  });
  if (filters.min_age) {
    params.append("min_age", String(filters.min_age));
  }
  if (filters.max_age) {
    params.append("max_age", String(filters.max_age));
  }
  if (filters.keyword) {
    params.append("keyword", String(filters.keyword));
  }
  if (filters.country) {
    params.append("country", String(filters.country));
  }
  const endpoint = `/users/search?${params.toString()}`;
  const response = await api.get(endpoint);
  return response.data;
};

export const sendMessage = async (
  payload: MessagePayload
): Promise<MessagesResponse> => {
  const response = await api.post("/chat/sendmessage", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getMessages = async (
  conversation_id: string
): Promise<GetMessagesResponse> => {
  const response = await api.get(`/chat/messages/${conversation_id}`);
  return response.data;
};
export const getConversations = async (): Promise<ConversationsResponse> => {
  const response = await api.get(`/chat/conversations`);
  return response.data;
};
