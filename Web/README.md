# Short URL Web Application

這是一個基於 Next.js、React 19 與 Tailwind CSS 的短網址產生器，支援圖片、影片上傳與密碼保護。

## 特色

- 產生短網址，支援密碼驗證
- 上傳圖片或影片並取得短網址
- 支援觀看次數統計
- 使用 Tailwind CSS 美化介面，支援暗色模式
- 前後端分離，API 介接彈性

## 專案結構

```
Web/
├── components/           # 共用元件
├── public/               # 靜態資源
├── services/             # API 服務
├── src/app/              # Next.js App 目錄
├── test/                 # 測試檔案
├── tailwind.config.js    # Tailwind CSS 設定
├── package.json          # 專案依賴與腳本
└── ...
```

## 安裝與啟動

1. 安裝依賴：
   ```bash
   npm install
   ```
2. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
3. 打包正式版：
   ```bash
   npm run build
   npm start
   ```

## 環境變數

請依照 `next.config.ts` 及 `.env` 檔案範例設定所需的環境變數。

Next.js 啟動時會自動將這些變數注入前端程式，若需更改端點請同步調整 `.env` 與 `next.config.ts`。

## 測試

使用 Jest 進行單元測試：

```bash
npm run test
```

## 主要技術

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)

## 貢獻

歡迎提出 issue 或 pull request！

## 授權

MIT License
