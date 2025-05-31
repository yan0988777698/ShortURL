// This component handles password input logic.
import React from "react";

interface PasswordInputProps {
  password: string;
  mode: "setup" | "access";
  onPasswordChange: (password: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  mode,
  onPasswordChange,
}) => {
  const labelText = mode === "setup" ? "設置密碼（可選）:" : "輸入密碼以訪問:";
  const placeholderText =
    mode === "setup" ? "設置短網址密碼" : "請輸入訪問密碼";

  return (
    <div className="space-y-2">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-300"
      >
        {labelText}
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        placeholder={placeholderText}
        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
      />
    </div>
  );
};

export default PasswordInput;
