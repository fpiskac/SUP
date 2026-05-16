namespace PekaraAPI.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("recept")]
public class Recept
{
    [Key]
    [Column("id_recept")]
    public int IdRecept { get; set; }

    [Column("naziv")]
    public string Naziv { get; set; }

    [Column("broj_komada")]
    public int BrojKomada { get; set; }

    [Column("ukupna_cijena")]
    public decimal UkupnaCijena { get; set; }

    public ICollection<ReceptSastojak> ReceptSastojci { get; set; }
    public ICollection<Proizvod> Proizvodi { get; set; }
}
