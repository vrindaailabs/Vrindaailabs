import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export default function FormInput({
  label,
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-slate-800">
        {label}
      </label>

      <input
        {...props}
        className={`w-full rounded-lg border px-4 py-3 outline-none transition
        ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-300 focus:border-blue-600"
        }
        ${className}`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}