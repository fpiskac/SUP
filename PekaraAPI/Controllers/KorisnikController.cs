using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PekaraAPI.Data;
using PekaraAPI.DTO;
using PekaraAPI.Models;

namespace PekaraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KorisnikController : ControllerBase
    {
        private readonly PekaraDbContext _context;

        public KorisnikController(PekaraDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<KorisnikDto>>> GetAll()
        {
            var korisnici = await _context.Korisnici
                .Select(k => new KorisnikDto
                {
                    IdKorisnik = k.IdKorisnik,
                    Ime = k.Ime,
                    KorisnickoIme = k.KorisnickoIme,
                    Uloga = k.Uloga
                })
                .ToListAsync();

            return Ok(korisnici);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<KorisnikDto>> GetById(int id)
        {
            var korisnik = await _context.Korisnici
                .Where(k => k.IdKorisnik == id)
                .Select(k => new KorisnikDto
                {
                    IdKorisnik = k.IdKorisnik,
                    Ime = k.Ime,
                    KorisnickoIme = k.KorisnickoIme,
                    Uloga = k.Uloga
                })
                .FirstOrDefaultAsync();

            if (korisnik == null)
                return NotFound();

            return Ok(korisnik);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateKorisnikDto dto)
        {
            var korisnik = new Korisnik
            {
                Ime = dto.Ime,
                KorisnickoIme = dto.KorisnickoIme,
                LozinkaHash = dto.Lozinka,
                Uloga = dto.Uloga
            };

            _context.Korisnici.Add(korisnik);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Korisnik korisnik)
        {
            if (id != korisnik.IdKorisnik)
                return BadRequest();

            _context.Entry(korisnik).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var korisnik = await _context.Korisnici.FindAsync(id);

            if (korisnik == null)
                return NotFound();

            _context.Korisnici.Remove(korisnik);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}