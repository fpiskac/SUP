using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PekaraAPI.Data;
using PekaraAPI.DTO;
using PekaraAPI.Models;

namespace PekaraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReceptSastojakController : ControllerBase
    {
        private readonly PekaraDbContext _context;

        public ReceptSastojakController(PekaraDbContext context)
        {
            _context = context;
        }

        [HttpGet("recept/{idRecept}")]
        public async Task<IActionResult> GetByReceptId(int idRecept)
        {
            var receptPostoji = await _context.Recepti
                .AnyAsync(r => r.IdRecept == idRecept);

            if (!receptPostoji)
                return NotFound("Recept ne postoji.");

            var sastojci = await _context.ReceptSastojci
                .Include(rs => rs.Sastojak)
                .Where(rs => rs.IdRecept == idRecept)
                .Select(rs => new
                {
                    rs.IdSastojak,

                    NazivSastojka = rs.Sastojak != null
                        ? rs.Sastojak.Naziv
                        : "",

                    rs.Kolicina
                })
                .ToListAsync();

            return Ok(sastojci);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateReceptSastojakDto dto)
        {
            var receptExists = await _context.Recepti
                .AnyAsync(x => x.IdRecept == dto.IdRecept);

            if (!receptExists)
                return BadRequest("Recept ne postoji.");

            var sastojakExists = await _context.Sastojci
                .AnyAsync(x => x.IdSastojak == dto.IdSastojak);

            if (!sastojakExists)
                return BadRequest("Sastojak ne postoji.");

            var receptSastojak = new ReceptSastojak
            {
                IdRecept = dto.IdRecept,
                IdSastojak = dto.IdSastojak,
                Kolicina = dto.Kolicina
            };

            _context.ReceptSastojci.Add(receptSastojak);

            await _context.SaveChangesAsync();
            await UpdateReceptCijena(dto.IdRecept);

            return Ok();
        }

        [HttpDelete("recept/{idRecept}")]
        public async Task<IActionResult> DeleteByRecept(int idRecept)
        {
            var stavke = await _context.ReceptSastojci
                .Where(x => x.IdRecept == idRecept)
                .ToListAsync();

            _context.ReceptSastojci.RemoveRange(stavke);

            await _context.SaveChangesAsync();

            return Ok();
        }


        private async Task UpdateReceptCijena(int idRecept)
        {
            var stavke = await _context.ReceptSastojci
                .Include(x => x.Sastojak)
                .Where(x => x.IdRecept == idRecept)
                .ToListAsync();

            decimal ukupnaCijena = 0;

            foreach (var stavka in stavke)
            {
                if (stavka.Sastojak != null)
                {
                    ukupnaCijena +=
                        stavka.Kolicina *
                        (decimal)stavka.Sastojak.CijenaPoJedinici;
                }
            }

            var recept = await _context.Recepti
                .FindAsync(idRecept);

            if (recept != null)
            {
                recept.UkupnaCijena =
                    ukupnaCijena;

                await _context.SaveChangesAsync();
            }
        }

    }
}