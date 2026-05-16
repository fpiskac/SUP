namespace PekaraAPI.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("sastojak")]
public class Sastojak
{
    [Key]
    [Column("id_sastojak")]
    public int IdSastojak { get; set; }

    [Column("naziv")]
    public string Naziv { get; set; }

    [Column("kolicina_nabave")]
    public decimal? KolicinaNabave { get; set; }

    [Column("cijena_nabave")]
    public decimal? CijenaNabave { get; set; }

    [Column("cijena_po_jedinici")]
    public decimal? CijenaPoJedinici { get; set; }

    public ICollection<ReceptSastojak> ReceptSastojci { get; set; }
}