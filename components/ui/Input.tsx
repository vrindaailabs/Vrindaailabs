import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border p-3 outline-none transition-colors focus:border-blue-600 border-gray-300 ${props.className ?? ""}`}
    />
  );
}