using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PekaraAPI.Data;
using PekaraAPI.DTO;
using PekaraAPI.Models;

namespace PekaraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SmjenaController : ControllerBase
    {
        private readonly PekaraDbContext _context;

        public SmjenaController(PekaraDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SmjenaDto>>> GetAll()
        {
            var smjene = await _context.Smjene
                .Select(s => new SmjenaDto
                {
                    IdSmjena = s.IdSmjena,
                    Datum = s.Datum,
                    TipSmjene = s.TipSmjene
                })
                .ToListAsync();

            return Ok(smjene);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateSmjenaDto dto)
        {
            var postojecaSmjena =
                await _context.Smjene
                .FirstOrDefaultAsync(s =>
                    s.Datum == dto.Datum
                    &&
                    s.TipSmjene == dto.TipSmjene
                );

            if (postojecaSmjena != null)
            {
                return Ok(new
                {
                    idSmjena =
                        postojecaSmjena.IdSmjena
                });
            }

            var smjena = new Smjena
            {
                Datum = dto.Datum,

                TipSmjene = dto.TipSmjene
            };

            _context.Smjene.Add(smjena);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                idSmjena = smjena.IdSmjena
            });
        }
    }
}