using Microsoft.AspNetCore.Identity;

namespace MyShortenee.Models;

public class Shorten
{
    public int Id { get; set; }
    public string ShortUrl { get; set; }
    public string FullUrl { get; set; }
    public string CreatedById { get; set; } 
    public DateTime CreatedAt { get; set; }
    public string ShortenName { get; set; }
    public string ShortenDescription { get; set; }
}