export const formatPrice = (amount: number | string): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    // minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

export const formatCompactPrice = (amount: number | string): string => {
  const numAmount = Number(amount);

  // Format large numbers in shortened form
  if (numAmount >= 1000000) {
    return `₦${(numAmount / 1000000).toFixed(1)}M`; // 12.3M
  }

  if (numAmount >= 1000) {
    return `₦${(numAmount / 1000).toFixed(1)}K`; // 20.5K
  }

  // Default currency formatting for smaller amounts
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
};

interface FormatOptions {
  compact?: boolean; // Whether to use K/M abbreviations
  decimals?: number; // Number of decimal places for compact format
  currency?: boolean; // Whether to include currency symbol
}

export const formatNumber = (
  amount: number | string,
  options: FormatOptions = {}
): string => {
  const { compact = true, decimals = 1, currency = false } = options;

  const numAmount = Number(amount);
  const prefix = currency ? "₦" : "";

  if (compact) {
    if (numAmount >= 1000000) {
      return `${prefix}${(numAmount / 1000000).toFixed(decimals)}M`;
    }

    if (numAmount >= 1000) {
      return `${prefix}${(numAmount / 1000).toFixed(decimals)}K`;
    }
  }

  return new Intl.NumberFormat("en-NG", {
    style: currency ? "currency" : "decimal",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
};
export const formatDate = (dateString: string, fancy?: boolean): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: fancy ? "short" : "2-digit",
    day: fancy ? "numeric" : "2-digit",
  });
};

export const getProgressPercent = Math.min(
  100,
  (40000000 / 700000000) * 100
).toFixed(1);

export const formatDateSimple = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};
