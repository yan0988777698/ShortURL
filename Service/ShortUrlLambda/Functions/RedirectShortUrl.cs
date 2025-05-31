using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Newtonsoft.Json;
using RedirectUrl.Utils;
using ShortUrlLambda.Shared;

namespace ShortUrlLambda.Functions;

public class RedirectShortUrl
{
    private static readonly AmazonDynamoDBClient _dynamoClient = new();
    private static readonly Table _table = Table.LoadTable(_dynamoClient, "ShortUrls");

    public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
    {
        if (request.PathParameters == null || !request.PathParameters.TryGetValue("code", out var code))
        {
            return Response.BadRequest("Missing code parameter");
        }

        var item = await _table.GetItemAsync(code);
        if (item == null)
        {
            return Response.NotFound("Short URL not found");
        }

        // 取得使用者輸入的密碼
        string inputPwd = string.Empty;
        if (!string.IsNullOrEmpty(request.Body))
        {
            try
            {
                var bodyObj = JsonConvert.DeserializeObject<Dictionary<string, string>>(request.Body);
                if (bodyObj != null && bodyObj.TryGetValue("pwd", out var rawPwd))
                {
                    inputPwd = CodeGenerator.ComputeSha256Hash(rawPwd);
                }
            }
            catch
            {
                return Response.BadRequest("Invalid JSON format.");
            }
        }
        string savedPwd = item.ContainsKey("pwd") ? item["pwd"].AsString() : string.Empty;

        // 若密碼存在，且比對失敗，回傳 403
        if (!string.IsNullOrEmpty(savedPwd) && inputPwd != savedPwd)
        {
            return Response.Forbidden("Incorrect password.");
        }

        int currentCount = item.ContainsKey("visitCount") ? item["visitCount"].AsInt() : 0;
        item["visitCount"] = currentCount + 1;
        await _table.UpdateItemAsync(item);

        var url = item.ContainsKey("originalUrl") ? item["originalUrl"].AsString() : "";

        return Response.Ok(new { url, visitCount = currentCount + 1 });
    }
}
