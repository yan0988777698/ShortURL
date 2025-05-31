import { generateShortUrl } from "../services/shortUrl.service";

const mockFetch = jest.fn();

global.fetch = mockFetch as any;

describe("generateShortUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // 清除 module cache
    process.env = {
      ...originalEnv,
      GenerateShortUrl: "https://fake-endpoint.com/api",
    };
  });

  afterEach(() => {
    process.env = originalEnv; // 還原原本環境變數
    jest.clearAllMocks();
  });

  it("should return short URL when API returns 200", async () => {
    const mockResponse = {
      shortUrl: "https://short.url/abc123",
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await generateShortUrl("https://example.com", "1234");
    expect(result).toBe(mockResponse.shortUrl);
    expect(fetch).toHaveBeenCalledWith(
      "https://fake-endpoint.com/api",
      expect.anything()
    );
  });

  it("should throw error when API returns non-200", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "Server crashed",
    });

    await expect(
      generateShortUrl("https://example.com", "1234")
    ).rejects.toThrow("GenerateShortUrl API 請求失敗");
  });

  it("should throw error when fetch throws", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(
      generateShortUrl("https://example.com", "1234")
    ).rejects.toThrow("GenerateShortUrl API 請求失敗");
  });

  it("should throw error if GenerateShortUrl env var is missing", async () => {
    delete process.env.GenerateShortUrl;

    await expect(
      generateShortUrl("https://example.com", "1234")
    ).rejects.toThrow(
      "Environment variable 'GenerateShortUrl' is not defined."
    );
  });
});
