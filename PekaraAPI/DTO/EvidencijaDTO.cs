namespace PekaraAPI.DTO
{
    public class EvidencijaDto
    {
        public int IdEvidencija { get; set; }

        public string Proizvod { get; set; } = string.Empty;

        public string Smjena { get; set; } = string.Empty;

        public int Proizvedeno { get; set; }

        public int Prodano { get; set; }

        public string? Radnik { get; set; } = string.Empty;

        public string? Prodavac { get; set; } = string.Empty;
    }
}
