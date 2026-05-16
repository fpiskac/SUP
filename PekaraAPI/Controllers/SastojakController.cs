using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PekaraAPI.Data;
using PekaraAPI.DTO;
using PekaraAPI.Models;

namespace PekaraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SastojakController : ControllerBase
    {
        private readonly PekaraDbContext _context;

        public SastojakController(PekaraDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SastojakDto>>> GetAll()
        {
            var sastojci = await _context.Sastojci
                .Select(s => new SastojakDto
                {
                    IdSastojak = s.IdSastojak,
                    Naziv = s.Naziv,
                    KolicinaNabave = s.KolicinaNabave,
                    CijenaNabave = s.CijenaNabave,
                    CijenaPoJedinici = s.CijenaPoJedinici
                })
                .ToListAsync();

            return Ok(sastojci);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateSastojakDto dto)
        {
            var sastojak = new Sastojak
            {
                Naziv = dto.Naziv,
                KolicinaNabave = dto.KolicinaNabave,
                CijenaNabave = dto.CijenaNabave,
                CijenaPoJedinici = dto.CijenaNabave / dto.KolicinaNabave
            };

            _context.Sastojci.Add(sastojak);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateSastojakDto dto)
        {
            var sastojak = await _context.Sastojci
                .FindAsync(id);

            if (sastojak == null)
            {
                return NotFound("Sastojak nije pronađen.");
            }

            sastojak.Naziv = dto.Naziv;
            sastojak.KolicinaNabave = dto.KolicinaNabave;
            sastojak.CijenaNabave = dto.CijenaNabave;
            sastojak.CijenaPoJedinici = dto.CijenaNabave / dto.KolicinaNabave;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Sastojak uspješno ažuriran."
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sastojak = await _context.Sastojci.FindAsync(id);

            if (sastojak == null)
                return NotFound();

            _context.Sastojci.Remove(sastojak);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}