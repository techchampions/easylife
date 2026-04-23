import { ErrorMessage, useField, useFormikContext } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.min.css";
// OR
import { CalendarDays, Info } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateSimple } from "../../utils/formatter";
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
    const formatedDate = formatDateSimple(String(date));
    setFieldValue(name, formatedDate);
  };
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-600 text-sm mb-1">{label}</label>
      )}
      <label className=" flex items-center justify-between bg-transparent border border-zinc-200 px-4 py-2 rounded-lg">
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
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
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

// import { ErrorMessage, useField, useFormikContext } from "formik";
// import { Calendar, CalendarDays, ChevronDown, Info } from "lucide-react";
// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// interface DatePickerInputProps {
//   name: string;
//   label?: string;
//   minDate?: Date;
//   maxDate?: Date;
//   placeholder?: string;
//   readOnly?: boolean;
//   showYearPicker?: boolean; // Initial mode
//   allowModeSwitch?: boolean; // Allow toggling between year and full date
// }

// const DatePickerInput: React.FC<DatePickerInputProps> = ({
//   name,
//   label,
//   minDate,
//   maxDate,
//   placeholder,
//   readOnly = false,
//   showYearPicker = false,
//   allowModeSwitch = true, // Default to true for flexibility
// }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);
//   const [isYearMode, setIsYearMode] = useState(showYearPicker);

//   const handleChange = (date: Date | null) => {
//     setFieldValue(name, date);
//   };

//   const toggleMode = () => {
//     setIsYearMode(!isYearMode);
//     // Optional: Clear the value when switching modes to avoid confusion
//     // setFieldValue(name, null);
//   };

//   const hasError = meta.touched && meta.error;

//   // Determine which format to show
//   const getDateFormat = () => {
//     if (isYearMode) return "yyyy";
//     return "dd-MM-yyyy";
//   };

//   return (
//     <div className="mb-4">
//       {label && (
//         <div className="flex justify-between items-center mb-1">
//           <label className="block text-gray-600 text-sm">{label} label</label>
//           {allowModeSwitch && (
//             <button
//               type="button"
//               onClick={toggleMode}
//               className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
//             >
//               {isYearMode ? (
//                 <>
//                   <Calendar className="w-3 h-3" />
//                   Switch to full date
//                 </>
//               ) : (
//                 <>
//                   <ChevronDown className="w-3 h-3" />
//                   Switch to year only
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       )}
//       <label className="relative flex items-center justify-between bg-transparent border border-zinc-200 px-4 py-2 rounded-lg">
//         <DatePicker
//           selected={field.value}
//           onChange={handleChange}
//           className="w-full p-1 outline-none text-gray-900"
//           minDate={minDate}
//           maxDate={maxDate}
//           dateFormat={getDateFormat()}
//           placeholderText={
//             isYearMode ? "Select year" : placeholder || "Select date"
//           }
//           readOnly={readOnly}
//           disabled={readOnly}
//           showYearPicker={isYearMode}
//           yearItemNumber={12}
//         />
//         <div className="flex gap-2 items-center">
//           {hasError && <Info className="w-5 h-5 text-red-500" />}
//           <CalendarDays className="text-gray-900 ml-2" />
//         </div>
//       </label>
//       <ErrorMessage
//         name={name}
//         component="p"
//         className="text-red-500 text-xs mt-1 ml-2 text-left"
//       />
//     </div>
//   );
// };

// export default DatePickerInput;
