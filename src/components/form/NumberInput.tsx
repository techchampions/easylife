import { useField } from "formik";
import { Minus, Plus } from "lucide-react";
import React, { useCallback } from "react";

interface NumberInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  theme?: string;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  name,
  label,
  placeholder = "0",
  min,
  max,
  step = 1,
  className = "",
  theme = "light",
  disabled = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  const value = field.value as number;

  const handleIncrement = useCallback(() => {
    let newValue = (value || 0) + step;

    // Apply constraints
    if (max !== undefined && newValue > max) {
      newValue = max;
    }

    helpers.setValue(newValue);
    helpers.setTouched(true);
  }, [value, step, max, helpers]);

  const handleDecrement = useCallback(() => {
    let newValue = (value || 0) - step;

    // Apply constraints
    if (min !== undefined && newValue < min) {
      newValue = min;
    }

    helpers.setValue(newValue);
    helpers.setTouched(true);
  }, [value, step, min, helpers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      helpers.setValue("");
      return;
    }

    let numValue = Number(inputValue);

    if (isNaN(numValue)) return;

    // Apply constraints
    if (min !== undefined && numValue < min) {
      numValue = min;
    }
    if (max !== undefined && numValue > max) {
      numValue = max;
    }

    helpers.setValue(numValue);
  };

  const handleBlur = () => {
    // Ensure value is within bounds on blur
    const currentValue = value;

    if (
      currentValue === undefined ||
      currentValue === null ||
      currentValue === 0
    ) {
      helpers.setValue("");
      return;
    }

    if (min !== undefined && currentValue < min) {
      helpers.setValue(min);
    }
    if (max !== undefined && currentValue > max) {
      helpers.setValue(max);
    }

    helpers.setTouched(true);
  };

  // Format display value
  const displayValue =
    value !== undefined && value !== null && value !== 0 ? value : "";

  return (
    <div className="w-full text-left">
      {label && (
        <div
          className={`text-sm mb-1 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {label}
        </div>
      )}

      <div className="relative">
        <div
          className={`flex items-center border rounded-lg overflow-hidden px-2 ${
            hasError
              ? "border-red-500"
              : theme === "dark"
              ? "border-gray-600"
              : "border-gray-200 focus-within:border-primary"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        >
          {/* Minus Button */}
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || (min !== undefined && value <= min)}
            className={`
              px-3 py-2 rounded-md transition-colors duration-200
              ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-200 hover:bg-gray-400 text-gray-700"
              }
              ${
                disabled || (min !== undefined && value <= min)
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
            aria-label="Decrease value"
          >
            <Minus className="w-3 h-3" />
          </button>

          {/* Input Field */}
          <input
            type="number"
            {...field}
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={`
              w-full text-center py-3 outline-none text-sm
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-900"
              }
              disabled:bg-gray-100 disabled:cursor-not-allowed
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none
            `}
          />

          {/* Plus Button */}
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || (max !== undefined && value >= max)}
            className={`
              px-3 py-2 rounded-md transition-colors duration-200
              ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-200 hover:bg-gray-400 text-gray-700"
              }
              ${
                disabled || (max !== undefined && value >= max)
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
            aria-label="Increase value"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="text-red-500 text-[9px] mt-1 ml-2 text-left">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default NumberInput;
