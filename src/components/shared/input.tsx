import { useState } from "react";
import cx from "classnames";
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

type InputProps = {
  name: string;
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder?: string;
  showForgotPassword?: boolean; // Toggle the "Forgot?" button
  onForgotPassword?: () => void; // Callback for "Forgot?" button
};

export function Input({
  name,
  id,
  label,
  type = "text",
  required = false,
  placeholder = "",
  showForgotPassword = false,
  onForgotPassword,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {/* Label */}
      <label
        htmlFor={id}
        className={cx(
          "block text-sm font-medium text-gray-700",
          required &&
            'after:content-["*"] after:ml-0.5 after:text-red-500'
        )}
      >
        {label}
      </label>

      {/* Input */}
      <input
        id={id}
        name={name}
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        required={required}
        className={cx(
          "mt-1 block w-full rounded-md border border-primary-700  focus:border-primary-300 focus:ring-primary-300 sm:text-sm"
        )}
        style={{
          height: "2.2rem", // Explicit height for the input field
          padding: "0.375rem 0.75rem", // Ensuring padding looks balanced
        }}
        {...props}
      />

      {/* Additional Features for Password Inputs */}
      {type === "password" && (
        <>
          {/* Forgot Password Button */}
          {showForgotPassword && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="absolute inset-y-0 right-20 flex items-center text-sm text-primary-600 hover:underline"
              style={{
                top: "1rem", // Vertically center the button
              }}
            >
              Forgot?
            </button>
          )}
          {/* Toggle Password Visibility */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
            style={{
              top: "1rem", // Vertically center the button
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </>
      )}
    </div>
  );
}
