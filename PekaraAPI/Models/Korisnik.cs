namespace PekaraAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("korisnik")]
public class Korisnik
{
    [Key]
    [Column("id_korisnik")]
    public int IdKorisnik { get; set;}
    [Column("ime")]
    public string Ime { get; set; }

    [Column("korisnicko_ime")]
    public string KorisnickoIme { get; set; }

    [Column("lozinka_hash")]
    public string LozinkaHash { get; set; }

    [Column("uloga")]
    public string Uloga { get; set; }

    public ICollection<Evidencija> RadnikEvidencije { get; set; }
    public ICollection<Evidencija> ProdavacEvidencije { get; set; }
}
