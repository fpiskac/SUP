namespace PekaraAPI.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("evidencija")]
public class Evidencija
{
    [Key]
    [Column("id_evidencija")]
    public int IdEvidencija { get; set; }

    [Column("id_smjena")]
    public int? IdSmjena { get; set; }

    public Smjena? Smjena { get; set; }

    [Column("id_proizvod")]
    public int? IdProizvod { get; set; }

    public Proizvod? Proizvod { get; set; }

    [Column("proizvedeno")]
    public int Proizvedeno { get; set; } = 0;

    [Column("prodano")]
    public int Prodano { get; set; } = 0;

    [Column("id_radnik")]
    public int? IdRadnik { get; set; }

    public Korisnik? Radnik { get; set; }

    [Column("id_prodavac")]
    public int? IdProdavac { get; set; }

    public Korisnik? Prodavac { get; set; }
}