using Xunit;

using Microsoft.EntityFrameworkCore;

using PekaraAPI.Data;
using PekaraAPI.Controllers;
using PekaraAPI.DTO;

namespace PekaraAPI.Tests
{
    public class IntegrationTests
    {
        [Fact]
        public async Task CreateSastojak_Works()
        {
            var options =
                new DbContextOptionsBuilder<PekaraDbContext>()
                .UseInMemoryDatabase("IntegrationDb")
                .Options;

            using var context =
                new PekaraDbContext(options);

            var controller =
                new SastojakController(context);

            var dto =
                new CreateSastojakDto
                {
                    Naziv = "Brasno",

                    KolicinaNabave = 1000,

                    CijenaNabave = 2
                };

            await controller.Create(dto);

            var count =
                context.Sastojci.Count();

            Assert.Equal(1, count);
        }
    }
}