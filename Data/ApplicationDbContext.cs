using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MyShortenee.Models;

namespace MyShortenee.Data;

public class ApplicationDbContext:IdentityDbContext<IdentityUser>
{
    public virtual DbSet<Shorten> Shortens { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }
}