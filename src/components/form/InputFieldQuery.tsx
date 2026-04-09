"use client";

import { ErrorMessage, Field, useField } from "formik";
import { CheckCircle2, Info, LoaderCircle } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface InputFieldProps {
  type?:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "checkbox"
    | "textarea";
  placeholder?: string;
  name: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  rows?: number;
  isLoading?: boolean;
  success?: boolean;
  onVerify?: (value: string) => Promise<void>;
  debounceDelay?: number;
}

const InputFieldQuery: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  name,
  icon,
  rightIcon,
  className = "",
  rows = 4,
  isLoading = false,
  success = false,
  onVerify,
  debounceDelay = 500,
}) => {
  const [field, meta] = useField(name);
  const isTextarea = type === "textarea";
  const hasError = meta.touched && meta.error;
  const isError = hasError && !isTextarea && !success;
  const debounceTimerRef = useRef<number>(0);

  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Only verify if there's a value and onVerify is provided
    if (field.value && field.value.trim() && onVerify) {
      debounceTimerRef.current = setTimeout(() => {
        onVerify(field.value);
      }, debounceDelay);
    }

    // Cleanup on unmount or when value changes
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [field.value, onVerify, debounceDelay]);

  return (
    <div className="w-full">
      <div
        className={`w-full relative flex ${
          isTextarea ? "flex-col" : "flex-row"
        } border bg-transparent rounded-lg py-3 ${
          hasError ? "border-red-500" : "border-zinc-200"
        } ${className}`}
      >
        {/* Left Icon */}
        {icon && !isTextarea && (
          <div className="flex items-center px-2">{icon}</div>
        )}

        {/* Field */}
        <Field
          as={isTextarea ? "textarea" : "input"}
          {...field}
          type={isTextarea ? undefined : type}
          placeholder={placeholder}
          rows={isTextarea ? rows : undefined}
          className={`text-gray-900 text-base rounded-lg focus:ring-0 block w-full px-5 outline-none resize-none ${
            isTextarea ? "min-h-15" : ""
          }`}
        />

        {/* Status Icons */}
        {isLoading ? (
          <div className="flex items-center px-3">
            <LoaderCircle className="w-5 h-5 text-gray-500 animate-spin" />
          </div>
        ) : success && field.value ? (
          <div className="flex items-center px-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
        ) : !success && field.value ? (
          <div className="flex items-center px-3">
            <Info className="w-5 h-5 text-red-500" />
          </div>
        ) : isError ? (
          <div className="flex items-center px-3">
            <Info className="w-5 h-5 text-red-500" />
          </div>
        ) : null}

        {/* Right Icon */}
        {rightIcon && <div className="flex items-center pr-3">{rightIcon}</div>}
      </div>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs mt-1 text-left"
      />
    </div>
  );
};

export default InputFieldQuery;
