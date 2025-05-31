using System.Security.Cryptography;
using System.Text;

namespace RedirectUrl.Utils
{
    internal class CodeGenerator
    {
        private static readonly string Alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        private static readonly Random Random = new();

        public static string GenerateCode(int length)
        {
            var sb = new StringBuilder(length);
            for (int i = 0; i < length; i++)
                sb.Append(Alphabet[Random.Next(Alphabet.Length)]);

            return sb.ToString();
        }

        public static string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                StringBuilder builder = new();
                foreach (var b in bytes)
                {
                    builder.Append(b.ToString("x2")); // 小寫十六進位格式
                }
                return builder.ToString();
            }
        }
    }
}
