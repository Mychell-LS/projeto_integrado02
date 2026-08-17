using System;
using System.IO.Ports;
using System.Text.Json;
using System.Net.Http;
using System.Text;

class Program
{
    static async Task Main()
    {
        Console.WriteLine("APP");

        SerialPort porta = new SerialPort("COM8", 115200);
        porta.Open();

        using HttpClient cliente = new HttpClient();

        while (true)
        {
            string dados = porta.ReadLine();

            Console.WriteLine(dados);

            double temperatura = double.Parse(dados);

            var objeto = new
            {
                temperatura = temperatura
            };

            string json = JsonSerializer.Serialize(objeto);

            StringContent conteudo = new StringContent(
                json,
                Encoding.UTF8,
                "application/json"
            );

            HttpResponseMessage respostaServidor = await cliente.PostAsync(
                "http://localhost:3000/dados",
                conteudo
            );

            string resposta = await respostaServidor.Content.ReadAsStringAsync();

            Console.WriteLine("Servidor: " + resposta);
        }
    }
}