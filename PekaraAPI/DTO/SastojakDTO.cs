namespace PekaraAPI.DTO
{
    public class SastojakDto
    {
        public int IdSastojak { get; set; }
        public string Naziv { get; set; } = string.Empty;
        public decimal? KolicinaNabave { get; set; }
        public decimal? CijenaNabave { get; set; }
        public decimal? CijenaPoJedinici { get; set; }
    }
}
