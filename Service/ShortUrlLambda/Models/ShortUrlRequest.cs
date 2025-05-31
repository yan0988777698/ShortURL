using Newtonsoft.Json;

namespace RedirectUrl.Models
{
    public class ShortUrlRequest
    {
        [JsonProperty("originalUrl")]
        public string OriginalUrl { get; set; } = string.Empty;

        [JsonProperty("pwd")]
        public string Pwd { get; set; } = string.Empty;
    }
}
