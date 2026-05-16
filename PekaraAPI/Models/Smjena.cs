namespace PekaraAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("smjena")]
public class Smjena
{
    [Key]
    [Column("id_smjena")]
    public int IdSmjena { get; set; }

    [Column("datum")]
    public DateOnly Datum { get; set; }

    [Column("tip_smjene")]
    public string TipSmjene { get; set; }

    public ICollection<Evidencija> Evidencije { get; set; }
}
