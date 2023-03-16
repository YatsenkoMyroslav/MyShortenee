namespace MyShortenee.Dto;

public class ShortenDto
{
    public int Id { get; set; }
    public string ShortUrl { get; set; }
    public string FullUrl { get; set; }
    public UserDto CreatedBy { get; set; } 
    public DateTime CreatedAt { get; set; }
    public string ShortenName { get; set; }
    public string ShortenDescription { get; set; }
}