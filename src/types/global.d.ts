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
  referralID: string;
  firstName: string;
  lastName: string;
  email: string;
  spouse_firstName: string;
  spouse_lastName: string;
  spouse_email: string;
  maritalStatus: "single" | "married" | string;
  dateOfBirth: string;
  placeOfBirth: string;
  spouse_dateOfBirth: string;
  spouse_placeOfBirth: string;
  previouslyMarried: string;
  prevMarriageChildren: string;
  address: string;
  state: string;
  city: string;
  country: string;
  nationality: string;
  raceOrTribe: string;
  religion: string;
  language: string[];
  height: string;
  size: string;
  spouse_nationality: string;
  spouse_raceOrTribe: string;
  spouse_religion: string;
  spouse_language: string[];
  spouse_height: string;
  spouse_size: string;
  healthChallenges: string;
  disabilities: string;
  spouse_healthChallenges: string;
  spouse_disabilities: string;
  singleUserStrenght: string;
  marriageLenght: string;
  whySignup: string;
  marriageIssues: string;
  aboutHusbandPositive: string;
  aboutWifePositive: string;
  aboutHusbandNegative: string;
  aboutWifeNegative: string;
  changesToWife: string;
  changesToHusband: string;
  singleUserWeakness: string;
  singleUserTolerance: string;
  SingleUsertypeOfSpouse: string;
  singleUserSellingPoint: string;
  singleUserTablePack: string;
  singleUserPhone: string;
  profilePicture: File | null;
  spouseProfilePicture: File | null;
  otherIssues: string;
  spousePhone: string;
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
