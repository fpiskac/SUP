namespace PekaraAPI.Tests;
using Xunit;

using Microsoft.EntityFrameworkCore;

using PekaraAPI.Data;
using PekaraAPI.Models;
using PekaraAPI.Controllers;
public class ProizvodControllerTests
{
    [Fact]
    public async Task GetAll_ReturnsOk()
    {
        var options =
            new DbContextOptionsBuilder<PekaraDbContext>()
            .UseInMemoryDatabase("TestDb")
            .Options;

        using var context =
            new PekaraDbContext(options);

        context.Proizvodi.Add(new Proizvod
        {
            Naziv = "Kruh"
        });

        context.SaveChanges();

        var controller =
            new ProizvodController(context);

        var result =
            await controller.GetAll();

        Assert.NotNull(result);
    }
}