using Xunit;

using PekaraAPI.Services;
namespace PekaraAPI.Tests
{
    public class ProizvodServiceTests
    {
        [Fact]
        public void IzracunajCijenuPoKg_ReturnsCorrect()
        {
            var service =
                new ProizvodService();

            decimal cijena = 2;

            decimal tezina = 500;

            var result =
                service.IzracunajCijenuPoKg(
                    cijena,
                    tezina
                );

            Assert.Equal(4, result);
        }

        [Fact]
        public void IzracunajProfit_ReturnsCorrect()
        {
            var service =
                new ProizvodService();

            decimal prodajna = 5;

            decimal izrada = 3;

            var result =
                service.IzracunajProfit(
                    prodajna,
                    izrada
                );

            Assert.Equal(2, result);
        }
    }
}