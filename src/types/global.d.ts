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
type User = {
  id: number;
  email: string;
  phone_number: string;
  referral_code: string;
  first_name: string;
  last_name: string;
  role: number;
  country: string | null;
  state: string | null;
  lga: string | null;
  otp_verified_at: string | null;
  email_verified_at: string | null;
  profile_picture: string | null;
  gender: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
};

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
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
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
