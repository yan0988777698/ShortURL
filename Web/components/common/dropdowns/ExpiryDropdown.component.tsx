// This component handles expiration selection logic.
import React from "react";

interface ExpiryDropdownProps {
  expiration: string;
  onExpirationChange: (expiration: string) => void;
}

const ExpiryDropdown: React.FC<ExpiryDropdownProps> = ({
  expiration,
  onExpirationChange,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="expiration"
        className="block text-sm font-medium text-gray-300"
      >
        設置過期時間:
      </label>
      <select
        id="expiration"
        value={expiration}
        onChange={(e) => onExpirationChange(e.target.value)}
        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
        required
      >
        <option value="" disabled>
          選擇過期時間
        </option>
        <option value="1h">1 小時</option>
        <option value="2h">2 小時</option>
        <option value="12h">12 小時</option>
        <option value="24h">24 小時</option>
      </select>
    </div>
  );
};

export default ExpiryDropdown;
