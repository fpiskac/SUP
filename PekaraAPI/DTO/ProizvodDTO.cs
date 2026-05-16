namespace PekaraAPI.DTO
{
    public class ProizvodDto
    {
        public int IdProizvod { get; set; }

        public string Naziv { get; set; } = string.Empty;

        public decimal? TezinaPoKomadu { get; set; }

        public decimal? ProdajnaCijena { get; set; }

        public decimal? IzradaCijena { get; set; }

        public decimal? CijenaPoKg { get; set; }

        public decimal? ProdajnaPoKg { get; set; }

        public int? IdRecept { get; set; }

        public string? ReceptNaziv { get; set; }
    }
}
