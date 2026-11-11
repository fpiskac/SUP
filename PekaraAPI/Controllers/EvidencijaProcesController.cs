using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PekaraAPI.Data;
using PekaraAPI.DTO;
using PekaraAPI.Models;

[ApiController]
[Route("api/evidencija-proces")]
public class EvidencijaProcesController : ControllerBase
{
    private readonly CamundaService _camunda;

    public EvidencijaProcesController(CamundaService camunda)
    {
        _camunda = camunda;
    }

    [HttpPost("start/{id}")]
    public async Task<IActionResult> Start(int id)
    {
        await _camunda.StartProces(id);
        return Ok();
    }

    [HttpPost("potvrdi/{id}")]
    public async Task<IActionResult> Potvrdi(int id)
    {
        await _camunda.PotvrdiEvidenciju(id);
        return Ok();
    }
}