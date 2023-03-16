using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Identity;

namespace MyShortenee.Extensions;

public static class UserManagerExtensions
{
    public static async Task<IdentityUser> GetUserByClaimsIdentityNameAsync(this UserManager<IdentityUser> userManager,
        IIdentity identity)
    {
        var claimsIdentity = identity as ClaimsIdentity;
        string? currentUserName = claimsIdentity?.FindFirst(ClaimTypes.Name)?.Value;
        IdentityUser user=await userManager.FindByNameAsync(currentUserName);
        return user;
    }
}