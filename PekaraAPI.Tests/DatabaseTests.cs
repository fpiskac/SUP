using Xunit;

using Microsoft.EntityFrameworkCore;

using PekaraAPI.Data;
using PekaraAPI.Models;
public class DatabaseTests
{
    [Fact]
    public async Task AddProduct_SavesToDatabase()
    {
        var options =
            new DbContextOptionsBuilder<PekaraDbContext>()
            .UseInMemoryDatabase("DbTest")
            .Options;

        using var context =
            new PekaraDbContext(options);

        context.Proizvodi.Add(new Proizvod
        {
            Naziv = "Burek"
        });

        await context.SaveChangesAsync();

        Assert.Equal(
            1,
            context.Proizvodi.Count()
        );
    }
}