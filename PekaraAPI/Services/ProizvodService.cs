namespace PekaraAPI.Services
{
    public class ProizvodService
    {
        public decimal IzracunajCijenuPoKg(
            decimal cijena,
            decimal tezinaG
        )
        {
            if (tezinaG <= 0)
            {
                return 0;
            }

            return (cijena / tezinaG) * 1000;
        }

        public decimal IzracunajProfit(
            decimal prodajna,
            decimal izrada
        )
        {
            return prodajna - izrada;
        }
    }
}