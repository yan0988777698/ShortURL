// This component handles the upload button logic.
import React from "react";

interface UploadButtonProps {
  onClick: () => void;
  loading: boolean;
  display?: string; // Add className as an optional prop
}

const UploadButton: React.FC<UploadButtonProps> = ({
  onClick,
  loading,
  display, // Destructure className
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform 
        ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 active:scale-95"
        }`}
      disabled={loading}
    >
      {loading ? `${display}中...` : `${display}`}
    </button>
  );
};

export default UploadButton;
