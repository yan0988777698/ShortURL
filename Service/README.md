# SHORTURL

本專案是一個 AWS Lambda 無伺服器短網址服務，支援短網址產生、密碼保護、點擊統計，以及 S3 檔案上傳簽名網址產生。

## 目錄結構

- `ShortUrlLambda/Functions/`：Lambda 主要功能（產生短網址、重導、產生 S3 簽名網址）
- `ShortUrlLambda/Models/`：請求/回應資料模型
- `ShortUrlLambda/Shared/`：共用回應格式
- `ShortUrlLambda/Utils/`：輔助工具（如短碼產生、雜湊）
- `ShortUrlLambda/Properties/`：Lambda 執行設定

## 主要功能

- 產生短網址（可選密碼保護）
- 透過短碼重導原始網址，並統計點擊次數
- 產生 S3 上傳/下載簽名網址，支援圖片（webp）與影片（mp4/webm）

## 快速開始

### 1. 安裝相依套件

```powershell
# 還原 .NET 相依套件
 dotnet restore
```

### 2. 本地測試

# 安裝 AWS Lambda 工具

```powershell
dotnet tool install -g Amazon.Lambda.Tools
```

# 啟動本地測試工具

```powershell
dotnet lambda test-tool
```

### 3. 部署到 AWS Lambda

```powershell
# 部署到 AWS Lambda，請將 <FunctionName> 替換為你的 Lambda 函數名稱
 dotnet lambda deploy-function <FunctionName>
```

## API 範例

### 產生短網址

- 路徑：`/generate-short-url`
- 方法：POST
- Body 範例：

```json
{
  "originalUrl": "https://example.com",
  "pwd": "1234"
}
```

### 重導短網址

- 路徑：`/redirect/{code}`
- 方法：POST
- Body（如有密碼）：

```json
{
  "pwd": "1234"
}
```

### 產生 S3 簽名網址

- 路徑：`/generate-s3-presigned-urls`
- 方法：POST
- Body 範例：

```json
{
  "fileName": "test.webp",
  "contentType": "image/webp",
  "expireMinutes": 60,
  "fileSize": 123456
}
```

## 注意事項

- 僅支援 webp 圖片與 mp4/webm 影片格式
- 圖片最大 5MB，影片最大 50MB
- DynamoDB Table 名稱：`ShortUrls`
- S3 Bucket 名稱：`shorturl-bkt`

---

如需更多細節，請參考 `ShortUrlLambda/Readme.md`。
