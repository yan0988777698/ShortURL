using Newtonsoft.Json;

namespace ShortUrlLambda.Models
{
    public class UploadRequest
    {
        [JsonProperty("fileName")]
        public string FileName { get; set; } = "";

        [JsonProperty("contentType")]
        public string ContentType { get; set; } = "";

        [JsonProperty("expireMinutes")]
        public int ExpireMinutes { get; set; } = 0;

        [JsonProperty("fileSize")]
        public long FileSize { get; set; } = 0; // 新增：由前端傳送檔案大小 (byte)
    }
}
