public class CamundaService
{
    private readonly HttpClient _http;
    private readonly string _baseUrl = "http://localhost:8080/engine-rest";

    public CamundaService(HttpClient http)
    {
        _http = http;
    }

    public async Task StartProces(int evidencijaId)
    {
        var body = new
        {
            variables = new
            {
                evidencijaId = new { value = evidencijaId, type = "Integer" }
            }
        };

        await _http.PostAsJsonAsync(
            $"{_baseUrl}/process-definition/key/evidencija-process/start",
            body
        );
    }

    public async Task PotvrdiEvidenciju(int evidencijaId)
    {
        var body = new
        {
            messageName = "potvrda_evidencije",
            correlationKeys = new
            {
                evidencijaId = new { value = evidencijaId, type = "Integer" }
            }
        };

        await _http.PostAsJsonAsync($"{_baseUrl}/message", body);
    }
}