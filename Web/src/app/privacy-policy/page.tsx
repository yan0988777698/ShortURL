import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="prose mx-auto max-w-3xl p-8">
      <h1 className="text-heading">隱私政策</h1>
      <p className="text-paragraph">
        我們重視您的隱私，以下說明我們如何蒐集、使用與保護您的個人資訊。
      </p>
      <h2 className="section-header">1. 資料蒐集</h2>
      <p className="text-paragraph">
        我們可能會收集您提供的資訊，如電子郵件、上傳的檔案、短網址點擊紀錄等。
      </p>
      <h2 className="section-header">2. 資料使用</h2>
      <p className="text-paragraph">
        所收集資料僅用於提供與改善服務功能，絕不會未經允許出售或提供給第三方。
      </p>
      <h2 className="section-header">3. 資料保護</h2>
      <p className="text-paragraph">
        我們採取合適的技術與管理措施保護您的資料不被未授權存取或洩漏。
      </p>
      <h2 className="section-header">4. Cookie 技術</h2>
      <p className="text-paragraph">
        本站可能使用 Cookie 儲存使用偏好與登入狀態，您可透過瀏覽器設定控制。
      </p>
      <h2 className="section-header">5. 使用者權利</h2>
      <p className="text-paragraph">
        您有權要求查詢、更正或刪除您的個人資料，可透過聯絡方式提出請求。
      </p>
      <h2 className="section-header">6. 政策更新</h2>
      <p className="text-paragraph">
        我們可能會不定期更新本政策，更新後的內容將公布於本站。
      </p>
      <p className="text-paragraph">若有任何隱私相關問題，請與我們聯繫。</p>
    </main>
  );
};

export default PrivacyPolicy;
