# ShortUrl 短網址服務

本專案是一套前後端分離的短網址服務，包含：

- 前端：Next.js + React 19 + Tailwind CSS，支援圖片/影片上傳、短網址產生、密碼保護與觀看次數統計。
- 後端：AWS Lambda（.NET 8），支援短網址產生、密碼驗證、S3 檔案簽名上傳與下載。

---

## 專案結構

```
Service/      # Lambda 無伺服器後端
Web/          # Next.js 前端
```

---

## 前端（Web）

- 主要技術：Next.js、React 19、Tailwind CSS、Jest
- 功能：
  - 上傳圖片（webp）或影片（mp4/webm）
  - 設定短網址密碼與過期時間
  - 產生短網址並複製
  - 密碼驗證後可觀看內容，並顯示觀看次數
  - 支援暗色模式與 RWD

### 安裝與啟動

```powershell
cd Web
npm install
npm run dev
```

### 測試

```powershell
npm run test
```

### 主要檔案

- `src/app/page.tsx`：首頁上傳元件
- `components/Upload.component.tsx`：上傳流程主元件
- `services/`：API 服務串接

---

## 後端（Service）

- 主要技術：.NET 8、AWS Lambda、DynamoDB、S3
- 功能：
  - 產生短網址（可選密碼）
  - 密碼驗證與短網址重導
  - S3 檔案簽名上傳/下載網址產生
  - 點擊次數統計

### 開發與部署

```powershell
cd Service/ShortUrlLambda
dotnet restore
dotnet tool install -g Amazon.Lambda.Tools
dotnet lambda deploy-function <FunctionName>
```

### 主要檔案

- `Functions/GenerateShortUrl.cs`：產生短網址
- `Functions/RedirectShortUrl.cs`：短網址重導
- `Functions/GenerateS3PresignedUrls.cs`：產生 S3 簽名網址

---

## API 範例

### 產生短網址

```
POST /generate-short-url
{
  "originalUrl": "https://example.com",
  "pwd": "1234"
}
```

### 重導短網址

```
POST /redirect/{code}
{
  "pwd": "1234"
}
```

### 產生 S3 簽名網址

```
POST /generate-s3-presigned-urls
{
  "fileName": "test.webp",
  "contentType": "image/webp",
  "expireMinutes": 60,
  "fileSize": 123456
}
```

---

## 注意事項

- 僅支援 webp 圖片與 mp4/webm 影片格式
- 圖片最大 5MB，影片最大 50MB
- DynamoDB Table 名稱：`ShortUrls`
- S3 Bucket 名稱：`shorturl-bkt`

---

## 授權

MIT License
