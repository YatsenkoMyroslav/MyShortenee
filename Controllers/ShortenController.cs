using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyShortenee.Dto;
using MyShortenee.Extensions;
using MyShortenee.Models;
using MyShortenee.Repository;
using MyShortenee.Services;

namespace MyShortenee.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ShortenController: Controller
{
    private UserManager<IdentityUser> _userManager;
    private ShortenRepository _shortenRepository;
    private IMapper _mapper;

    public ShortenController(UserManager<IdentityUser> userManager, ShortenRepository repository)
    {
        _shortenRepository = repository;
        _userManager = userManager;
        MapperConfiguration configuration = new MapperConfiguration(opt =>
        {
            opt.CreateMap<Shorten, ShortenDto>();
            opt.CreateMap<ShortenDto, Shorten>();
            opt.CreateMap<IdentityUser, UserDto>();
            opt.CreateMap<UserDto, IdentityUser>();
        });
        _mapper = new Mapper(configuration);
    }
    
    [HttpGet("/all")]
    public IEnumerable<ShortenDto> GetAllShortens()
    {
        var response = _shortenRepository.GetAll().OrderByDescending(s => s.CreatedAt).
            Select(s => _mapper.Map<Shorten, ShortenDto>(s));

        return response;
    }

    [HttpGet("/{id}")]
    [Authorize]
    public async Task<IActionResult> GetShortenById(int id)
    {
        
        var shorten = await _shortenRepository.GetByIdAsync(id);
        var response = _mapper.Map<Shorten, ShortenDto>(shorten);

        return Json(response);
    }
    
    [HttpGet("/getfullurl")]
    public async Task<IActionResult> GetFullUrlByShort(string shortUrl)
    {
        var shorten = await _shortenRepository.GetAll().FirstOrDefaultAsync(s => s.ShortUrl == shortUrl);

        if (shorten != null)
            return Json(shorten.FullUrl);
        else
            return NotFound();
    }
    
    [Authorize]
    [HttpGet("/getfullshorten")]
    public async Task<IActionResult> GetFullShortenByShort(string shortUrl)
    {
        var shorten = await _shortenRepository.GetAll().FirstOrDefaultAsync(s => s.ShortUrl == shortUrl);
        var dto = _mapper.Map<Shorten, ShortenDto>(shorten);
        
        Task<IdentityUser> task = _userManager.FindByIdAsync(shorten.CreatedById);

        task.Wait();
        var user = await task;

        dto.CreatedBy = new UserDto()
        {
            Email = user.Email,
            UserName = user.UserName,
            Id = shorten.CreatedById
        };

        return Json(dto);
    }

    [Authorize]
    [HttpPost("/create")]
    public async Task<IActionResult> CreateShorten([FromBody]ShortenCreation model)
    {
        if (await LongUrlExisting(model.FullUrl))
            return Conflict("Such URL already exists");

        if (!Uri.TryCreate(model.FullUrl, UriKind.Absolute, out _))
        {
            return BadRequest("Incorrect URL");
        }

        var user = await _userManager.GetUserByClaimsIdentityNameAsync(User.Identity!);
        
        var shorten = new Shorten
        {
            CreatedAt = DateTime.Now,
            CreatedById = user.Id,
            FullUrl = model.FullUrl,
            ShortenName = model.ShortenName,
            ShortenDescription = model.ShortenDescription
        };

        string shortUrl;
        do
        {
            shortUrl = UrlTransferService.CreateShortUrl(model.FullUrl);
        } while (await ShortUrlExisting(shortUrl));

        shorten.ShortUrl = shortUrl;
        
        await _shortenRepository.AddAsync(shorten);
        
        return Ok("Successfully created");
    }

    [Authorize]
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteById(int id)
    {
        Console.WriteLine("in delete");
        Console.WriteLine(id);
        var elem = await _shortenRepository.GetAll().FirstOrDefaultAsync(el => el.Id==id);
        
        if(elem==null)
        {
            return BadRequest("No such Shortee");
        }

        await _shortenRepository.RemoveAsync(elem);
        
        return Ok("Successfully deleted");
    }

    private async Task<bool> ShortUrlExisting(string shortUrl)
    {
        var shorten = await _shortenRepository.GetAll().FirstOrDefaultAsync(s => s.ShortUrl == shortUrl);
        
        return shorten!=null;
    }
    
    private async Task<bool> LongUrlExisting(string fullUrl)
    {
        var shorten = await _shortenRepository.GetAll().FirstOrDefaultAsync(s => s.FullUrl == fullUrl);
        
        return shorten!=null;
    }
}