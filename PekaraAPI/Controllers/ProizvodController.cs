using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PekaraAPI.Data;
using PekaraAPI.DTO;
using PekaraAPI.Models;

namespace PekaraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProizvodController : ControllerBase
    {
        private readonly PekaraDbContext _context;

        public ProizvodController(PekaraDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProizvodDto>>> GetAll()
        {
            var proizvodi = await _context.Proizvodi
                .Include(p => p.Recept)
                .Select(p => new ProizvodDto
                {
                    IdProizvod = p.IdProizvod,

                    Naziv = p.Naziv,

                    TezinaPoKomadu = p.TezinaPoKomadu,

                    ProdajnaCijena = p.ProdajnaCijena,

                    IzradaCijena = p.IzradaCijena,

                    CijenaPoKg = p.CijenaPoKg,

                    ProdajnaPoKg = p.ProdajnaPoKg,

                    IdRecept = p.IdRecept,

                    ReceptNaziv =
                        p.Recept != null
                            ? p.Recept.Naziv
                            : null
                })
                .ToListAsync();

            return Ok(proizvodi);
        }

        [HttpPost]
        public async Task<IActionResult> Create(
    CreateProizvodDto dto)
        {
            var recept = await _context.Recepti
                .FindAsync(dto.IdRecept);

            if (recept == null)
            {
                return BadRequest(
                    "Recept nije pronađen."
                );
            }

            decimal izradaCijena = 0;

            if (recept.BrojKomada > 0)
            {
                izradaCijena =
                    recept.UkupnaCijena /
                    recept.BrojKomada;
            }

            decimal cijenaPoKg = 0;
            decimal prodajnaPoKg = 0;

            if (dto.TezinaPoKomadu > 0)
            {
                cijenaPoKg =
                    (izradaCijena /
                    dto.TezinaPoKomadu.Value)
                    * 1000;

                prodajnaPoKg =
                    (dto.ProdajnaCijena.Value /
                    dto.TezinaPoKomadu.Value)
                    * 1000;
            }

            if(dto.ProdajnaCijena <= izradaCijena)
            {
                return BadRequest(
                    "Prodajna cijena mora biti veća od cijene izrade."
                );
            }

            var proizvod = new Proizvod
            {
                Naziv = dto.Naziv,

                TezinaPoKomadu =
                    dto.TezinaPoKomadu,

                ProdajnaCijena =
                    dto.ProdajnaCijena,

                IdRecept = dto.IdRecept,

                IzradaCijena =
                    izradaCijena,

                CijenaPoKg =
                    cijenaPoKg,

                ProdajnaPoKg =
                    prodajnaPoKg
            };

            _context.Proizvodi.Add(proizvod);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
    int id,
    CreateProizvodDto dto)
        {
            var proizvod = await _context.Proizvodi
                .FindAsync(id);

            if (proizvod == null)
                return NotFound();

            var recept = await _context.Recepti
                .FindAsync(dto.IdRecept);

            if (recept == null)
            {
                return BadRequest(
                    "Recept nije pronađen."
                );
            }

            decimal izradaCijena = 0;

            if (recept.BrojKomada > 0)
            {
                izradaCijena =
                    recept.UkupnaCijena /
                    recept.BrojKomada;
            }

            decimal cijenaPoKg = 0;
            decimal prodajnaPoKg = 0;

            if (dto.TezinaPoKomadu > 0)
            {
                cijenaPoKg =
                    (izradaCijena /
                    dto.TezinaPoKomadu.Value)
                    * 1000;

                prodajnaPoKg =
                    (dto.ProdajnaCijena.Value /
                    dto.TezinaPoKomadu.Value)
                    * 1000;
            }

            proizvod.Naziv =
                dto.Naziv;

            proizvod.TezinaPoKomadu =
                dto.TezinaPoKomadu;

            proizvod.ProdajnaCijena =
                dto.ProdajnaCijena;

            proizvod.IdRecept =
                dto.IdRecept;

            proizvod.IzradaCijena =
                izradaCijena;

            proizvod.CijenaPoKg =
                cijenaPoKg;

            proizvod.ProdajnaPoKg =
                prodajnaPoKg;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var proizvod = await _context.Proizvodi.FindAsync(id);

            if (proizvod == null)
                return NotFound();

            _context.Proizvodi.Remove(proizvod);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}