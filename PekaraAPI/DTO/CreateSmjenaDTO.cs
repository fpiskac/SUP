namespace PekaraAPI.DTO
{
    public class CreateSmjenaDto
    {
        public DateOnly Datum { get; set; }

        public string TipSmjene { get; set; }
            = string.Empty;
    }
}
