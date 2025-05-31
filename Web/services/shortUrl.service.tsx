interface RedirectResponse {
  url: string;
  visitCount: number;
}
interface ShortUrlResponse {
  shortUrl: string;
}

// 這個函數會將原始網址和密碼傳送到指定的 API，並返回生成的短網址
export async function generateShortUrl(
  originalUrl: string,
  password: string
): Promise<string> {
  const endpoint = process.env.GenerateShortUrl;

  if (!endpoint) {
    throw new Error("Environment variable 'GenerateShortUrl' is not defined.");
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl, pwd: password }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("GenerateShortUrl API 錯誤內容：", errText);
      throw new Error(
        `Failed to get short URL: ${res.status} ${res.statusText}`
      );
    }

    const result: ShortUrlResponse = await res.json();
    console.log("GenerateShortUrl API 返回內容：", result);
    return result.shortUrl;
  } catch (error) {
    console.error("呼叫 GenerateShortUrl API 時發生錯誤：", error);
    throw new Error("GenerateShortUrl API 請求失敗");
  }
}

// 這個函數會將短網址轉換為實際的網址，並返回訪問次數
export async function redirectShortUrl(
  shortCode: string,
  password: string
): Promise<RedirectResponse> {
  const baseUrl = process.env.RedirectShortUrl;

  if (!baseUrl) {
    throw new Error("Environment variable 'RedirectShortUrl' is not defined.");
  }
  try {
    const shortCodeUrl = `${baseUrl}/${encodeURIComponent(shortCode)}`;
    const res = await fetch(shortCodeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(
        `Fail to redirect shortUrl (HTTP ${res.status} - ${res.statusText}):${errorBody}`
      );
    }

    const result: RedirectResponse = await res.json();

    // 確保 result 包含 url 和 visitCount
    if (!result.url || typeof result.visitCount !== "number") {
      throw new Error("Invalid response format from RedirectShortUrl API.");
    }

    return result;
  } catch (error: any) {
    console.error("An exception occurred in RedirectShortUrl:", error);
    throw new Error("RedirectShortUrl API request failed.");
  }
}
