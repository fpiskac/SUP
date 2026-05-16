namespace PekaraAPI.DTO
{
    public class SmjenaDto
    {
        public int IdSmjena { get; set; }
        public DateOnly Datum { get; set; }
        public string TipSmjene { get; set; } = string.Empty;
    }
}
