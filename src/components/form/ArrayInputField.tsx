"use client";

import { useField, FieldArray } from "formik";
import { Info, Plus, Trash2 } from "lucide-react";
import React from "react";

interface ArrayInputFieldProps {
  name: string;
  placeholder?: string;
  addButtonText?: string;
  minItems?: number;
  maxItems?: number;
  className?: string;
  showDeleteButton?: boolean;
}

const ArrayInputField: React.FC<ArrayInputFieldProps> = ({
  name,
  placeholder = "Enter text...",
  addButtonText = "Add item",
  minItems = 0,
  maxItems = 10,
  className = "",
  showDeleteButton = true,
}) => {
  const [, meta] = useField<string[]>(name);
  const hasError = meta.touched && meta.error;

  return (
    <FieldArray name={name}>
      {({ push, remove, form }) => {
        const values: string[] = form.values[name] || [];

        return (
          <div className={`w-full space-y-3 ${className}`}>
            {values.map((value, index) => {
              const itemError = Array.isArray(meta.error)
                ? meta.error[index]
                : undefined;
              const itemTouched = Array.isArray(meta.touched)
                ? meta.touched[index]
                : undefined;
              const hasItemError = itemTouched && itemError;

              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div
                      className={`w-full relative flex flex-row border bg-transparent rounded-lg py-3 ${
                        hasItemError ? "border-red-500" : "border-zinc-200"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) =>
                          form.setFieldValue(
                            `${name}[${index}]`,
                            e.target.value
                          )
                        }
                        onBlur={() =>
                          form.setFieldTouched(`${name}[${index}]`, true)
                        }
                        className="text-gray-900 text-base rounded-lg focus:ring-0 block w-full px-5 outline-none"
                      />

                      {/* Error Icon */}
                      {hasItemError && (
                        <div className="flex items-center px-3">
                          <Info className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>

                    {/* Item Error Message */}
                    {hasItemError && (
                      <p className="text-red-500 text-xs mt-1 text-left">
                        {itemError}
                      </p>
                    )}
                  </div>

                  {/* Delete Button */}
                  {showDeleteButton && values.length > minItems && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-3 rounded-lg border border-zinc-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Add Button */}
            {values.length < maxItems && (
              <button
                type="button"
                onClick={() => push("")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-dashed border-blue-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {addButtonText}
              </button>
            )}

            {/* Array Error Message */}
            {hasError && typeof meta.error === "string" && (
              <p className="text-red-500 text-xs mt-1 text-left">
                {meta.error}
              </p>
            )}
          </div>
        );
      }}
    </FieldArray>
  );
};

export default ArrayInputField;
