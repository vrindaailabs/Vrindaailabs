import { SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: FieldError;
}

export default function FormSelect({
  label,
  options,
  error,
  className = "",
  ...props
}: FormSelectProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-slate-800">
        {label}
      </label>

      <select
        {...props}
        className={`w-full rounded-lg border px-4 py-3 outline-none transition
        ${
            error
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
        }
        ${className}`}
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}