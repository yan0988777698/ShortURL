"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { redirectShortUrl } from "../../../services/shortUrl.service";
import {
  isVideoUrl,
  isImageUrl,
} from "../../../components/common/utils/CommonUtility";
import {
  Toast,
  useToast,
} from "../../../components/common/toasts/Toast.component";
import Image from "next/image";
import PasswordInput from "../../../components/common/inputs/PasswordInput.component";
import UploadButton from "../../../components/common/buttons/UploadButton.component";

export default function shortCodePage() {
  const params = useParams();
  const shortcode = params.shortcode as string;
  const { toasts, addToast } = useToast();
  const [realUrl, setRealUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visitCount, setVisitCount] = useState<number | null>(null);

  // 如果已認證，取得對應的真正 URL
  const fetchUrl = async () => {
    if (isLoading || isAuthenticated) return;
    setIsLoading(true);
    try {
      const { url, visitCount } = await redirectShortUrl(shortcode, password);
      setRealUrl(url);
      setVisitCount(visitCount);
      setIsAuthenticated(true);
    } catch (err) {
      addToast("取得短網址內容失敗，請檢查密碼或稍後再試。", "error");
      console.error("取得短網址內容失敗：", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toast messages={toasts} />

      {!isAuthenticated ? (
        <div className="card-container body-container">
          <PasswordInput
            password={password}
            mode="access"
            onPasswordChange={setPassword}
          />
          <UploadButton onClick={fetchUrl} loading={isLoading} display="驗證" />
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "calc(100vh - 100px)",
          }}
        >
          {realUrl && isVideoUrl(realUrl) ? (
            <video
              controls
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onLoadedData={() => setIsLoading(false)}
              onError={() => {
                addToast("影片載入失敗，請稍後再試。", "error");
                setIsLoading(false);
              }}
            >
              <source src={realUrl} />
              您的瀏覽器不支援影片播放。
            </video>
          ) : realUrl && isImageUrl(realUrl) ? (
            <Image
              src={realUrl}
              alt="圖片載入中"
              fill
              style={{ objectFit: "contain" }}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                addToast("圖片載入失敗，請稍後再試。", "error");
                setIsLoading(false);
              }}
            />
          ) : (
            <div className="paragraph">
              <p>無法顯示該內容，請檢查連結或稍後再試。</p>
            </div>
          )}

          {/* 載入中遮罩層 */}
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white ml-4">載入中...</span>
            </div>
          )}
        </div>
      )}
      {visitCount !== null && (
        <div className="text-paragraph text-center">觀看次數：{visitCount}</div>
      )}
    </div>
  );
}
