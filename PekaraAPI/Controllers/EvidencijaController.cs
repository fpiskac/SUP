using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PekaraAPI.Data;
using PekaraAPI.DTO;
using PekaraAPI.Models;

namespace PekaraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EvidencijaController : ControllerBase
    {
        private readonly PekaraDbContext _context;

        public EvidencijaController(PekaraDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EvidencijaDto>>> GetAll()
        {
            var evidencije = await _context.Evidencije
                .Include(e => e.Proizvod)
                .Include(e => e.Smjena)
                .Include(e => e.Radnik)
                .Include(e => e.Prodavac)
                .Select(e => new EvidencijaDto
                {
                    IdEvidencija = e.IdEvidencija,
                    Proizvod = e.Proizvod != null ? e.Proizvod.Naziv : "",
                    Smjena = e.Smjena != null ? e.Smjena.TipSmjene : "",
                    Proizvedeno = e.Proizvedeno,
                    Prodano = e.Prodano,
                    Radnik = e.Radnik != null ? e.Radnik.Ime : "",
                    Prodavac = e.Prodavac != null ? e.Prodavac.Ime : ""
                })
                .ToListAsync();

            return Ok(evidencije);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateEvidencijaDto dto)
        {
            var evidencija = new Evidencija
            {
                IdSmjena = dto.IdSmjena,
                IdProizvod = dto.IdProizvod,
                Proizvedeno = dto.Proizvedeno,
                Prodano = dto.Prodano,
                IdRadnik = dto.IdRadnik,
                IdProdavac = dto.IdProdavac
            };

            _context.Evidencije.Add(evidencija);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("pregled")]
        public async Task<IActionResult> Pregled(
            [FromQuery] DateOnly datum,
            [FromQuery] string tipSmjene)
                {
                    var evidencije =
                        await _context.Evidencije
                        .Include(e => e.Proizvod)
                        .Include(e => e.Smjena)
                        .Where(e =>
                            e.Smjena != null
                            &&
                            e.Smjena.Datum == datum
                            &&
                            e.Smjena.TipSmjene ==
                                tipSmjene
                        )
                        .Select(e => new
                        {
                            Naziv =
                                e.Proizvod != null
                                    ? e.Proizvod.Naziv
                                    : "",

                            Proizvedeno =
                                e.Proizvedeno,

                            Prodano =
                                e.Prodano,

                            IzradaCijena =
                                e.Proizvod != null
                                    ? e.Proizvod.IzradaCijena
                                    : 0,

                            ProdajnaCijena =
                                e.Proizvod != null
                                    ? e.Proizvod.ProdajnaCijena
                                    : 0
                        })
                        .ToListAsync();

                    return Ok(evidencije);
                }
    }
}