using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PekaraAPI.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using PekaraAPI.DTO;
using PekaraAPI.Models;

namespace PekaraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly PekaraDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(PekaraDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var korisnik = await _context.Korisnici
                .FirstOrDefaultAsync(x => x.KorisnickoIme == dto.KorisnickoIme);

            if (korisnik == null)
                return Unauthorized("Korisnik ne postoji");

            if (korisnik.LozinkaHash != dto.Lozinka)
                return Unauthorized("Pogrešna lozinka");

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, korisnik.KorisnickoIme),
                new Claim(ClaimTypes.Role, korisnik.Uloga),
                new Claim("Id", korisnik.IdKorisnik.ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(8),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                idKorisnik = korisnik.IdKorisnik,   
                role = korisnik.Uloga,
                username = korisnik.KorisnickoIme
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var postojiKorisnik = await _context.Korisnici
                .AnyAsync(x => x.KorisnickoIme == dto.KorisnickoIme);

            if (postojiKorisnik)
            {
                return BadRequest("Korisničko ime već postoji.");
            }

            var korisnik = new Korisnik
            {
                Ime = dto.Ime,
                KorisnickoIme = dto.KorisnickoIme,
                LozinkaHash = dto.Lozinka,
                Uloga = dto.Uloga
            };

            _context.Korisnici.Add(korisnik);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Korisnik dodan."
            });
        }
    }
}