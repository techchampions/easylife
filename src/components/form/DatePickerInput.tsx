import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.min.css";
// OR
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays, Info } from "lucide-react";
interface DatePickerInputProps {
  name: string;
  label?: string;
  minDate?: Date;
  maxDate?: Date;

  placeholder?: string;
  readOnly?: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  name,
  label,
  minDate,
  maxDate,
  placeholder,
  readOnly = false,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (date: Date | null) => {
    setFieldValue(name, date);
  };
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-600 text-sm mb-1">{label}</label>
      )}
      <label className="relative flex items-center justify-between bg-transparent border border-zinc-200 px-4 py-2 rounded-lg">
        <DatePicker
          selected={field.value}
          onChange={handleChange}
          className="w-full p-1 outline-none text-gray-900"
          minDate={minDate} // 👈 Prevent past dates
          maxDate={maxDate} // 👈 Prevent future dates
          dateFormat="dd-MM-yyyy"
          placeholderText={placeholder}
          readOnly={readOnly} // 👈 Prevent typing
          disabled={readOnly} // 👈 Disable calendar pop-up
          //   isClearable={!readOnly} // 👈 Disable clear if readOnly
        />
        <div className="flex gap-2 items-center">
          {hasError && <Info className="w-5 h-5 text-red-500" />}
          <CalendarDays className="text-gray-900 ml-2" />
        </div>
      </label>
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs mt-1 ml-2 text-left"
      />
    </div>
  );
};

export default DatePickerInput;
