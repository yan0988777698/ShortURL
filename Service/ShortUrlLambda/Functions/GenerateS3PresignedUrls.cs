using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.S3;
using Amazon.S3.Model;
using Newtonsoft.Json;
using ShortUrlLambda.Models;
using ShortUrlLambda.Shared;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace ShortUrlLambda.Functions
{
    public class GenerateS3PresignedUrls
    {
        private readonly AmazonS3Client s3Client = new AmazonS3Client();
        private readonly string bucketName = "shorturl-bkt";

        // 檔案大小限制（以 byte 為單位）
        private const int MaxImageSize = 5 * 1024 * 1024;   // 5MB
        private const int MaxVideoSize = 50 * 1024 * 1024;  // 50MB

        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            try
            {
                var body = JsonConvert.DeserializeObject<UploadRequest>(request.Body ?? "");

                if (body == null || string.IsNullOrEmpty(body.FileName) || string.IsNullOrEmpty(body.ContentType))
                    return Response.BadRequest("Missing fileName or contentType.");

                var contentType = body.ContentType.ToLower();

                // 判斷檔案(圖片/影片)
                var isImage = contentType.StartsWith("image/");
                var isVideo = contentType.StartsWith("video/");

                if (!isImage && !isVideo)
                    return Response.BadRequest("Unsupported file type.");

                // 判斷檔案大小限制
                if (body.FileSize <= 0)
                    return Response.BadRequest("File size is required.");

                if (isImage)
                {
                    if (contentType != "image/webp")
                        return Response.BadRequest("Only .webp images are allowed. Please convert before uploading.");

                    if (body.FileSize > MaxImageSize)
                        return Response.BadRequest("Image file size exceeds 5MB.");
                }

                if (isVideo)
                {
                    var allowedVideoTypes = new HashSet<string> { "video/mp4", "video/webm" };

                    if (!allowedVideoTypes.Contains(contentType))
                        return Response.BadRequest("Unsupported video format.");

                    if (body.FileSize > MaxVideoSize)
                        return Response.BadRequest("Video file size exceeds 50MB.");
                }

                // 檔案副檔名與 S3 key
                var fileExt = Path.GetExtension(body.FileName); // 例如 .webp 或 .mp4
                var prefix = isImage ? "img" : "video";
                var key = $"{prefix}/{Guid.NewGuid()}{fileExt}";

                int expireMinutes = body.ExpireMinutes > 0 ? body.ExpireMinutes : 120;

                var uploadUrl = GeneratePresignedUploadUrl(key, contentType, 10);
                var downloadUrl = GeneratePresignedDownloadUrl(key, expireMinutes);

                var responseJson = new
                {
                    uploadUrl,
                    downloadUrl,
                    key
                };

                return Response.Ok(responseJson);
            }
            catch (Exception ex)
            {
                return Response.InternalServerError(ex);
            }
        }

        private string GeneratePresignedUploadUrl(string key, string contentType, int expireMinutes)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = key,
                Verb = HttpVerb.PUT,
                ContentType = contentType,
                Expires = DateTime.UtcNow.AddMinutes(expireMinutes)
            };
            return s3Client.GetPreSignedURL(request);
        }

        private string GeneratePresignedDownloadUrl(string key, int expireMinutes)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = key,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(expireMinutes)
            };
            return s3Client.GetPreSignedURL(request);
        }        
    }
}
