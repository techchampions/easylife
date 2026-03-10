import { ErrorMessage, useField } from "formik";
import { Check, Info } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface CheckboxFieldProps {
  name: string;
  label?: string;
  linkText?: string;
  link?: string;
  labelPosition?: "left" | "right";
  className?: string;
  theme?: "light" | "dark";
  disabled?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  linkText,
  link,
  labelPosition = "right",
  className = "",
  theme = "light",
  disabled = false,
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  // Handle checkbox toggle
  // const handleChange = () => {
  //   helpers.setValue(!field.value);
  //   helpers.setTouched(true);
  // };

  return (
    <div className={`w-full text-left ${className}`}>
      <label className="flex items-center cursor-pointer">
        {label && labelPosition === "left" && (
          <span className="text-sm mr-2">{label}</span>
        )}

        <div className={`relative flex items-center`}>
          {/* Hidden checkbox for Formik */}
          <input
            type="checkbox"
            {...field}
            checked={field.value || false}
            disabled={disabled}
            className="sr-only"
          />
          {/* <input
            type="checkbox"
            name={field.name}
            checked={field.value || false}
            onChange={handleChange}
            onBlur={field.onBlur}
            disabled={disabled}
            className="sr-only"
          /> */}

          {/* Custom checkbox appearance */}
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
              hasError
                ? "border-red-500"
                : theme === "dark"
                ? "border-gray-700"
                : "border-gray-300"
            }
             ${
               field.value
                 ? "bg-transparent border-alaba"
                 : "bg-white dark:bg-gray-800"
             }
            `}
            // onClick={handleChange}
          >
            {field.value && (
              <Check className="w-3 h-3" />
              //   <svg
              //     className="w-3 h-3 text-white"
              //     viewBox="0 0 20 20"
              //     fill="currentColor"
              //   >
              //     <path
              //       fillRule="evenodd"
              //       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              //       clipRule="evenodd"
              //     />
              //   </svg>
            )}
          </div>
        </div>

        {label && labelPosition === "right" && (
          <>
            <span className="text-sm ml-2">
              {label}{" "}
              <Link
                className="text-blue-500 hover:underline underline-offset-2 text-xs"
                to={`/${link}`}
              >
                {linkText}
              </Link>
            </span>
          </>
        )}
      </label>

      {/* Error Message */}
      {/* Error Icon */}
      <div className="flex items-center gap-0 mt-1">
        {hasError && (
          <div className="">
            <Info className="w-4 h-4 text-red-500" />
          </div>
        )}

        <ErrorMessage
          name={name}
          component="p"
          className="text-red-500 text-[9px] mt-1 ml-2 text-left"
        />
      </div>
    </div>
  );
};

export default CheckboxField;
