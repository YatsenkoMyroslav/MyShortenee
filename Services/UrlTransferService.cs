using Microsoft.AspNetCore.WebUtilities;

namespace MyShortenee.Services;

public static class UrlTransferService
{
    static Random _random = new Random();
    public static string CreateShortUrl(string longUrl)
    {
        int randNum = _random.Next(10000000);

        var response = WebEncoders.Base64UrlEncode(BitConverter.GetBytes(randNum));
        return response;
    }
}