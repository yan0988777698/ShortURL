using Amazon.Lambda.APIGatewayEvents;
using System.Net;
using Newtonsoft.Json;

namespace ShortUrlLambda.Shared
{
    public static class Response
    {
        public static APIGatewayProxyResponse BadRequest(string message) => new()
        {
            StatusCode = (int)HttpStatusCode.BadRequest,
            Body = JsonConvert.SerializeObject(new { error = message }),
            Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
        };

        public static APIGatewayProxyResponse Ok(object data) => new()
        {
            StatusCode = (int)HttpStatusCode.OK,
            Body = JsonConvert.SerializeObject(data),
            Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
        };

        public static APIGatewayProxyResponse InternalServerError(Exception ex) => new()
        {
            StatusCode = (int)HttpStatusCode.InternalServerError,
            Body = JsonConvert.SerializeObject(new { error = ex.Message }),
            Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
        };

        public static APIGatewayProxyResponse NotFound(string message) => new()
        {
            StatusCode = (int)HttpStatusCode.NotFound,
            Body = JsonConvert.SerializeObject(new { error = message }),
            Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
        };
        public static APIGatewayProxyResponse Redirect(string url) => new()
        {
            StatusCode = (int)HttpStatusCode.Redirect,
            Headers = new Dictionary<string, string>
            {
                { "Location", url }
            }
        };
        public static APIGatewayProxyResponse Forbidden(string message) => new()
        {
            StatusCode = (int)HttpStatusCode.Forbidden,
            Body = JsonConvert.SerializeObject(new { error = message }),
            Headers = new Dictionary<string, string> { { "Content-Type", "text/plain" } }
        };
    }
}
