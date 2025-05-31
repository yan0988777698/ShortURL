import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <main className="prose mx-auto max-w-3xl p-8">
      <h1 className="text-heading">服務條款</h1>
      <p className="text-paragraph">
        歡迎使用我們的服務！請您仔細閱讀以下服務條款。
      </p>
      <h2 className="section-header">1. 服務內容</h2>
      <p className="text-paragraph">
        我們提供檔案上傳、短網址產生等功能，使用者應遵守法律規定使用服務。
      </p>
      <h2 className="section-header">2. 使用限制</h2>
      <p className="text-paragraph">
        不得上傳或分享非法、侵權、或令人不適之內容，違者本站有權移除內容並停權。
      </p>
      <h2 className="section-header">3. 內容所有權</h2>
      <p className="text-paragraph">
        使用者保有所上傳內容之所有權，但需授權本服務為提供功能進行暫時性處理。
      </p>
      <h2 className="section-header">4. 責任限制</h2>
      <p className="text-paragraph">
        本站盡力維持服務穩定，但不保證服務不會中斷、資料不會遺失，請自行備份重要內容。
      </p>
      <h2 className="section-header">5. 條款修改</h2>
      <p className="text-paragraph">
        我們保留隨時修改條款之權利，變更將公告於網站，您持續使用即表示同意更新條款。
      </p>
      <p className="text-paragraph">若您對條款有任何疑問，歡迎與我們聯繫。</p>
    </main>
  );
};

export default TermsOfService;
