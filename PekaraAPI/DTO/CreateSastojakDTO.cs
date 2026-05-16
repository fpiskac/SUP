namespace PekaraAPI.DTO
{
    public class CreateSastojakDto
    {
        public string Naziv { get; set; } = string.Empty;
        public decimal? KolicinaNabave { get; set; }
        public decimal? CijenaNabave { get; set; }
    }
}
