using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PekaraAPI.Data;
using PekaraAPI.DTO;
using PekaraAPI.Models;

namespace PekaraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReceptController : ControllerBase
    {
        private readonly PekaraDbContext _context;

        public ReceptController(PekaraDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAll()
        {
            var recepti = await _context.Recepti
                .Select(r => new
                {
                    r.IdRecept,
                    r.Naziv,
                    r.BrojKomada,
                    r.UkupnaCijena
                })
                .ToListAsync();

            return Ok(recepti);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ReceptDto dto)
        {
            var recept = new Recept
            {
                Naziv = dto.Naziv,
                BrojKomada = dto.BrojKomada,
                UkupnaCijena = 0
            };

            _context.Recepti.Add(recept);

            await _context.SaveChangesAsync();

            return Ok(recept);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,ReceptDto dto)
            {
                var recept = await _context.Recepti
                    .FindAsync(id);

                if (recept == null)
                    return NotFound();

                recept.Naziv = dto.Naziv;

                recept.BrojKomada = dto.BrojKomada;

                await _context.SaveChangesAsync();

                return Ok();
            }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var recept = await _context.Recepti.FindAsync(id);

            if (recept == null)
                return NotFound();

            _context.Recepti.Remove(recept);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}