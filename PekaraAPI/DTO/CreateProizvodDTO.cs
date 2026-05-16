namespace PekaraAPI.DTO
{
    public class CreateProizvodDto
    {
        public string Naziv { get; set; } = string.Empty;
        public decimal? TezinaPoKomadu { get; set; }
        public decimal? ProdajnaCijena { get; set; }
        public int? IdRecept { get; set; }
    }
}
