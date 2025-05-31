import {
  fileToWebP,
  isImageFile,
  isVideoFile,
} from "../components/common/utils/CommonUtility";
import { generateShortUrl } from "./shortUrl.service";
import { generateS3PresignedUrls, uploadToS3 } from "./s3PresignedUrl.service";

async function prepareFileForUpload(file: File): Promise<File> {
  if (isImageFile(file)) {
    return await fileToWebP(file);
  } else if (isVideoFile(file)) {
    return file;
  } else {
    throw new Error(`不支援的檔案格式：${file.type}`);
  }
}

// 支援圖片與影片上傳，回傳短網址
export default async function uploadMedia(
  file: File,
  password: string,
  expiration: string
): Promise<string> {
  const processedFile = await prepareFileForUpload(file);

  const res = await generateS3PresignedUrls(processedFile, expiration);

  await uploadToS3(res.uploadUrl, processedFile);

  const shortUrl = await generateShortUrl(res.downloadUrl, password);

  return shortUrl;
}
