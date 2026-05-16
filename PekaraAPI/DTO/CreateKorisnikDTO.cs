namespace PekaraAPI.DTO
{
    public class CreateKorisnikDto
    {
        public string Ime { get; set; } = string.Empty;
        public string KorisnickoIme { get; set; } = string.Empty;
        public string Lozinka { get; set; } = string.Empty;
        public string Uloga { get; set; } = string.Empty;
    }
}
