"use client";
import React, { useState } from "react";
import uploadMedia from "../services/uploadMedia.service";
import FileSelector from "./common/selectors/FileSelector.component";
import Password from "./common/inputs/PasswordInput.component";
import ExpiryDropdown from "./common/dropdowns/ExpiryDropdown.component";
import { Toast, useToast } from "./common/toasts/Toast.component";
import UploadButton from "./common/buttons/UploadButton.component";

// This is the main component for image upload.
const UploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [expiration, setExpiration] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>("");
  const { toasts, addToast } = useToast();

  const handleUpload = async () => {
    if (!file || !expiration) {
      addToast("請選擇檔案及過期時間。", "error");
      return;
    }

    setLoading(true);

    try {
      const fileUrl = await uploadMedia(file, password, expiration);
      setFileUrl(fileUrl);
      addToast("檔案上傳成功！", "success");
    } catch (error) {
      console.error("Error uploading file:", error);
      addToast("上傳過程中發生錯誤，請稍後再試。", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-container mx-auto p-6 sm:p-8 text-gray-100 flex flex-col items-center">
      <h1 className="text-heading">圖片/影片上傳</h1>

      <div className="fixed top-4 right-4 z-50">
        <Toast messages={toasts} />
      </div>

      <div className="card-container">
        <FileSelector onFileChange={setFile} />
        <Password
          password={password}
          mode="setup"
          onPasswordChange={setPassword}
        />
        <ExpiryDropdown
          expiration={expiration}
          onExpirationChange={setExpiration}
        />
        {fileUrl ? (
          <button
            onClick={() => {
              navigator.clipboard.writeText(fileUrl);
              addToast("連結已複製！", "success");
            }}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform"
          >
            複製連結
          </button>
        ) : (
          <UploadButton
            onClick={handleUpload}
            loading={loading}
            display="上傳"
          />
        )}
      </div>
    </div>
  );
};

export default UploadComponent;
