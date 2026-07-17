import React from "react";

type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border p-3 outline-none transition-colors focus:border-blue-600 border-gray-300 ${props.className ?? ""}`}
    />
  );
}