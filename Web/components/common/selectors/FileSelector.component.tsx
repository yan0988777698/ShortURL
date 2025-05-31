// This component handles file selection logic.
import React from "react";

interface FileSelectorProps {
  onFileChange: (file: File | null) => void;
}

const FileSelector: React.FC<FileSelectorProps> = ({ onFileChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileChange(selectedFile);
  };

  return (
    <input
      type="file"
      onChange={handleFileChange}
      accept="image/*,video/*"
      className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
    />
  );
};

export default FileSelector;
