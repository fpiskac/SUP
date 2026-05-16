namespace PekaraAPI.DTO
{
    public class CreateEvidencijaDto
    {
        public int IdSmjena { get; set; }

        public int IdProizvod { get; set; }

        public int Proizvedeno { get; set; }

        public int Prodano { get; set; }

        public int? IdRadnik { get; set; }

        public int? IdProdavac { get; set; }
    }
}
