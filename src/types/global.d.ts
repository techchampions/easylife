// LANDING PAGE TYPES
interface ContentType {
  icon: React.ReactNode;
  title: string;
  desc?: string;
  list?: string[];
}

//API TYPES
type ApiError = {
  response?: {
    data?: {
      errors?: Record<string, string[]>;
      message?: string;
    };
  };
  status: number;
  message?: string;
};

// AUTHENTICATION TYPES

interface LoginPayload {
  email: string;
  password: string;
}
interface RegisterPayload {
  email: string;
  password: string;
}
interface PasswordPayload {
  otp: string;
  password: string;
  password_confirmation: string;
}

type LoginError = {
  status: boolean;
  message: string;
  token: string;
  otpVerified: boolean;
  profileCompleted: boolean;
};
type RegisterError = {
  error: string;
  errors: { username: string[]; email: string[]; password: string[] };
};
interface ForgotPasswordError {
  message: string;
}

interface VerifyReferalCodeResponse {
  success: boolean;
  is_exist: boolean;
}

// TOAST TYPES
type ToastType = "success" | "error" | "info" | "message";

interface ToastStore {
  show: boolean;
  message: string;
  type: ToastType;
  showToast: (msg: string, type: ToastType) => void;
  hideToast: () => void;
}

// USER GLOBAL STATE
interface GetUserResponse {
  success: boolean;
  user: User;
  interests: string[] | null;
  photos: string[] | null;
  permission: Permission;
}
interface GetUserBYIDResponse {
  success: boolean;
  user_profile: User;
}

interface User {
  id: number;
  email: string;

  first_name: string | null;
  last_name: string | null;

  country: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  lga: string | null;

  is_admin: 0 | 1;
  is_verify: 0 | 1;
  notification_enabled: 0 | 1;

  date_of_birth: string | null;
  place_of_birth: string | null;
  nationality: string | null;
  race_or_tribe: string | null;
  religion: string | null;
  language: string | null;

  gender: string | null;
  marital_status: "single" | "married" | null;
  previously_married: string | null;
  have_children: string | null;
  number_of_children: number | null;

  height: string | null;
  size: string | null;
  genotype: string | null;
  blood_group: string | null;

  health_challenges: string | null;
  disabilities: string | null;

  occupation: string | null;
  annual_income: string | null;
  level_of_education: string | null;

  short_bio: string | null;

  min_age: number | null;
  max_age: number | null;

  plan_id: number | null;
  plan: Plan | null;

  device_id: string;

  otp_verified_at: string | null;
  email_verified_at: string | null;
  profile_completed_at: string | null;

  profile_picture: string | null;
  photos: string[] | null;
  interests: string[] | null;

  // Spouse info
  spouse_first_name: string | null;
  spouse_last_name: string | null;
  spouse_email: string | null;
  spouse_date_of_birth: string | null;
  spouse_place_of_birth: string | null;
  spouse_nationality: string | null;
  spouse_race_or_tribe: string | null;
  spouse_religion: string | null;
  spouse_language: string | null;
  spouse_height: string | null;
  spouse_size: string | null;
  spouse_health_challenges: string | null;
  spouse_disabilities: string | null;
  spouse_profile_picture: string | null;

  // Questionnaire fields
  single_user_strength: string | null;
  single_user_weakness: string | null;
  single_user_tolerance: string | null;
  single_user_type_of_spouse: string | null;
  single_user_selling_point: string | null;
  single_user_table_pack: string | null;
  single_user_phone: string | null;

  marriage_length: string | null;
  why_signup: string | null;
  marriage_issues: string | null;
  about_husband_positive: string | null;
  about_wife_positive: string | null;
  about_husband_negative: string | null;
  about_wife_negative: string | null;
  changes_to_wife: string | null;
  changes_to_husband: string | null;
  other_issues: string | null;

  referral_id: string | null;

  created_at: string;
  updated_at: string;
}

interface Permission {
  id: number;
  user_id: number;

  conversation: 0 | 1;
  story: 0 | 1;
  webiner_access: 0 | 1;
  mentorship: 0 | 1;
  verifiedaccount: 0 | 1;
  notify_new_reg: 0 | 1;

  search_type: "local" | "global";
  count_views: number;
  message_count: number;

  is_locked: 0 | 1;

  created_at: string;
  updated_at: string;
}

interface Plan {
  id: number;
  name: string;
  price: number;
}
interface UserFilterParams {
  keyword?: string;
  page?: number;
  country?: string;
  min_age?: string;
  max_age?: string;
}

interface DiscoverResponse {
  success: boolean;
  message: string;
  result: PaginatedUsers;
}

type UserState = {
  user: User | null;
  acceptCookies: boolean;
  token: string;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  setIsLoggedIn: (status: boolean) => void;
  setUser: (user: User) => void; // 👈 add this  getUser: () => Promise<void>;
  setAcceptCookies: (accept: boolean) => void;
  reset: () => void;
};

// MODAL TYPES
interface ModalState {
  isCloseable: boolean;
  isOpen: boolean;
  content: ReactNode | null;
  open: (content: ReactNode) => void;
  openStrong: (content: ReactNode) => void;
  close: () => void;
}

// LANDING PAGE NAV ITEM
interface LandingNavItem {
  label: string;
  href: string;
}

// ONBOARDING USER DATA
type OnboardingFormData = {
  referral_id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  spouse_first_name: string;
  spouse_last_name: string;
  spouse_email: string;
  marital_status: "single" | "married" | string;
  date_of_birth: string;
  place_of_birth: string;
  spouse_date_of_birth: string;
  spouse_place_of_birth: string;
  previously_married: string;
  prev_marriage_children: string;
  address: string;
  state: string;
  city: string;
  country: string;
  nationality: string;
  race_or_tribe: string;
  religion: string;
  language: string[];
  height: string;
  size: string;
  spouse_nationality: string;
  spouse_race_or_tribe: string;
  spouse_religion: string;
  spouse_language: string[];
  spouse_height: string;
  spouse_size: string;
  health_challenges: string;
  disabilities: string;
  spouse_health_challenges: string;
  spouse_disabilities: string;
  single_user_strength: string;
  marriage_length: string;
  why_signup: string;
  marriage_issues: string;
  about_husband_positive: string;
  about_wife_positive: string;
  about_husband_negative: string;
  about_wife_negative: string;
  changes_to_wife: string;
  changes_to_husband: string;
  single_user_weakness: string;
  single_user_tolerance: string;
  single_user_type_of_spouse: string;
  single_user_selling_point: string;
  single_user_table_pack: string;
  single_user_phone: string;
  profile_picture: File | null;
  spouse_profile_picture: File | null;
  other_issues: string;
  spouse_phone: string;
  setOnboardingFormData: (
    details: Partial<
      Omit<
        OnboardingFormData,
        "setOnboardingFormData" | "resetOnboardingFormData"
      >
    >
  ) => void;
  resetOnboardingFormData: () => void;
};

// ALL USERS RESPONSE

interface AllUsersResponse {
  success: boolean;
  users: UserListItem[];
}

interface PaginatedUsers {
  data: UserListItem[];
  current: number;
  prev: number | null;
  next: number | null;
  total: number;
}

interface UserListItem {
  id: number;
  email: string;

  first_name: string;
  last_name: string;

  country: string | null;
  state: string | null;
  lga: string | null;

  date_of_birth: string | null;
  otp_verified_at: string | null;
  profile_completed_at: string | null;
  email_verified_at: string | null;

  profile_picture: string | null;
  photos: string[] | null;

  gender: "male" | "female" | string;

  notification_enabled: 0 | 1;

  interests: string[] | null;

  marital_status: string | null;
  have_children: string | null;
  number_of_children: number | null;

  height: string | null;
  genotype: string | null;
  blood_group: string | null;

  nationality: string | null;
  religion: string | null;

  level_of_education: string | null;
  occupation: string | null;
  annual_income: string | null;

  short_bio: string | null;

  device_id: string;

  created_at: string;
  updated_at: string;

  plan_id: number | null;
  plan_name: string | null;
}

// MESSAGING TYPES

interface MessagesResponse {
  success: boolean;
  messages: Message[];
  receiver: string;
  compose: Compose;
}

interface Compose {
  id: number;
  sender: number;
  receiver: number;
  sender_unread: number;
  receiver_unread: number;
  conversation: string;
  last_message: string | null;
  created_at: string;
  updated_at: string;
}
interface Message {
  id: number;
  user_id: string;
  conversation: string;
  message: string;
  attach: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  is_delivered: "0" | "1";
  receiver: string;
  user: MessageUser;
}

interface MessageUser {
  id: number;
  firstName: string;
  lastName: string;
  profile_picture: string;
}

interface MessagePayload {
  receiver: number;
  message?: string;
}

interface GetMessagesResponse {
  status: boolean;
  messages: Message[];
}

interface ConversationUser {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
}

interface Conversation {
  id: number;
  sender: ConversationUser;
  receiver: ConversationUser;
  sender_unread: number;
  receiver_unread: number;
  conversation: string;
  last_message: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

interface ConversationsResponse {
  success: boolean;
  conversations: Conversation[];
}
interface NotificationsResponse {
  success: boolean;
  users: Notification[];
}

interface Notification {
  id: number;
  title: string;
  content: string;
  user_id: number;
  is_read: number;
  conversation: string;
  created_at: string;
  updated_at: string;
  profile_viewer: number;
}

//mMENTORSHIP
interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
interface Mentorship {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  photos: string[] | null;
  user_type: number;
  likes: number;
  dislikes: number;
  slug: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: MentorshipUser | null;
}
interface MentorshipUser {
  id: number;
  first_name: string;
  email: string;
}
interface PaginatedMentorships {
  current_page: number;
  data: Mentorship[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
interface GetMentorshipsResponse {
  success: boolean;
  data: PaginatedMentorships;
  message: string;
}
interface GetMentorshipsResponsePostById {
  success: boolean;
  data: Mentorship;
  message: string;
}
