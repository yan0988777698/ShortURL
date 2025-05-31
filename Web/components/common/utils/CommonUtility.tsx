// 工具函數：將過期時間轉換為分鐘
// 支援小時（例如 "2h"）和分鐘（例如 "30"）
export function convertToMinutes(val: string): number {
  const num = parseInt(val);
  if (val.includes("h")) return num * 60;
  return num;
}

// 工具函數：將檔案轉換為 WebP 格式
export async function fileToWebP(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, ".webp"),
                {
                  type: "image/webp",
                }
              );
              resolve(webpFile);
            } else {
              reject(new Error("Failed to convert image to WebP"));
            }
          },
          "image/webp",
          0.8 // Quality setting (0.8 is a good balance between quality and size)
        );
      };

      img.onerror = () => {
        reject(new Error("Failed to load image for conversion"));
      };

      if (event.target?.result) {
        img.src = event.target.result as string;
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

// 工具函數：檢查網址是否為圖片url或影片url
export function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg)$/i.test(url.split("?")[0]);
}

export function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url.split("?")[0]);
}

// 工具函數：檢查檔案類型
export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

export function isVideoFile(file: File): boolean {
  return file.type.startsWith("video/");
}
