namespace PekaraAPI.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("proizvod")]
public class Proizvod
{
    [Key]
    [Column("id_proizvod")]
    public int IdProizvod { get; set; }

    [Column("naziv")]
    public string Naziv { get; set; }

    [Column("tezina_po_komadu")]
    public decimal? TezinaPoKomadu { get; set; }

    [Column("prodajna_cijena")]
    public decimal? ProdajnaCijena { get; set; }

    [Column("izrada_cijena")]
    public decimal? IzradaCijena { get; set; }

    [Column("id_recept")]
    public int? IdRecept { get; set; }
    public Recept Recept { get; set; }

    [Column("cijena_po_kg")]
    public decimal? CijenaPoKg { get; set; }

    [Column("prodajna_po_kg")]
    public decimal? ProdajnaPoKg { get; set; }

    public ICollection<Evidencija> Evidencije { get; set; }
}