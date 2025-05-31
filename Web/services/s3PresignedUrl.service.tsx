interface PresignedUrlResponse {
  uploadUrl: string;
  downloadUrl: string;
  key: string;
}

import { convertToMinutes } from "../components/common/utils/CommonUtility";

// 獲取 S3 上傳和下載的預簽名 URL
// 接收檔案和過期時間作為輸入，返回包含上傳 URL、下載 URL 和檔案鍵的物件
export async function generateS3PresignedUrls(
  file: File,
  expiration: string
): Promise<PresignedUrlResponse> {
  const expireMinutes = convertToMinutes(expiration);

  const requestBody = {
    fileName: file.name,
    contentType: file.type,
    expireMinutes: expireMinutes,
    fileSize: file.size,
  };

  const apiUrl = process.env.GenerateS3PresignedUrls;
  if (!apiUrl) {
    throw new Error(
      "Environment variable 'GenerateS3PresignedUrls' is not defined."
    );
  }
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(
        `Fail to generate s3PresignedUrl (HTTP ${res.status}):${errorBody}`
      );
    }
    const result: PresignedUrlResponse = await res.json();
    if (!result.uploadUrl || !result.downloadUrl || !result.key) {
      throw new Error(
        "Invalid response format from GenerateS3PresignedUrls API."
      );
    }
    return result;
  } catch (error: any) {
    console.error("An exception occurred in GenerateS3PresignedUrls:", error);
    throw new Error("GenerateS3PresignedUrls API request failed.");
  }
}

// 將檔案上傳到 S3
// 接收上傳 URL 和檔案作為輸入，若上傳失敗則拋出錯誤
export async function uploadToS3(uploadUrl: string, file: File): Promise<void> {
  try {
    const res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to upload to S3.(HTTP ${res.status}):${errorText}`
      );
    }
  } catch (error: any) {
    console.error("An exception occurred in uploadToS3:", error);
    throw new Error("uploadToS3 API request failed.");
  }
}
