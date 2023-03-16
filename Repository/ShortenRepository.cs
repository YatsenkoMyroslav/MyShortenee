using MyShortenee.Data;
using MyShortenee.Models;

namespace MyShortenee.Repository;

public class ShortenRepository: Repository<Shorten>
{
    public ShortenRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }
}