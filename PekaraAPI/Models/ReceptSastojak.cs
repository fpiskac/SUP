namespace PekaraAPI.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("recept_sastojak")]
public class ReceptSastojak
{
    [Column("id_recept")]
    public int IdRecept { get; set; }
    public Recept Recept { get; set; }

    [Column("id_sastojak")]
    public int IdSastojak { get; set; }
    public Sastojak Sastojak { get; set; }

    [Column("kolicina")]
    public decimal Kolicina { get; set; }
}
