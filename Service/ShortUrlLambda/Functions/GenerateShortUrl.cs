using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Newtonsoft.Json;
using RedirectUrl.Models;
using RedirectUrl.Utils;
using ShortUrlLambda.Shared;

namespace ShortUrlLambda.Functions;

public class GenerateShortUrl
{
    private static readonly AmazonDynamoDBClient _dynamoClient = new();
    private static readonly Table _table = Table.LoadTable(_dynamoClient, "ShortUrls");
    private const string _baseUrl = "https://main.d1mapjnh6m51q2.amplifyapp.com/"; // 替換為你的短網址網域

    public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
    {
        if (string.IsNullOrEmpty(request.Body))
            return Response.BadRequest("Request body is empty.");

        ShortUrlRequest? body;
        try
        {
            body = JsonConvert.DeserializeObject<ShortUrlRequest>(request.Body);
        }
        catch (Exception)
        {
            return Response.BadRequest("Invalid JSON format.");
        }

        if (body == null || string.IsNullOrWhiteSpace(body.OriginalUrl))
            return Response.BadRequest("Missing required field: OriginalUrl.");

        var code = CodeGenerator.GenerateCode(6);

        string hashedPwd = string.Empty;
        if (!string.IsNullOrWhiteSpace(body.Pwd))
        {
            hashedPwd = CodeGenerator.ComputeSha256Hash(body.Pwd);
        }

        var item = new Document
        {
            ["code"] = code,
            ["originalUrl"] = body.OriginalUrl,
            ["pwd"] = hashedPwd,
            ["visitCount"] = 0
        };

        await _table.PutItemAsync(item);

        var shortUrl = _baseUrl + code;

        return Response.Ok(new { shortUrl });
    }

}
