import { TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
}

export default function FormTextarea({
  label,
  error,
  className = "",
  ...props
}: FormTextareaProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-slate-800">
        {label}
      </label>

      <textarea
        {...props}
        className={`w-full rounded-lg border px-4 py-3 outline-none transition resize-y
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