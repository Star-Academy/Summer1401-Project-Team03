using server.Databases;
using server.Components.Extractors;
using server.Components.Loaders;
using server.Pipelines;

public static class TestMain
{
    private const string Host = "localhost";
    private const string Username = "postgres";
    private const string Database = "postgres";
    private const string Password = "Khosro1381";

    public static void Main(string[] args)
    {
        Pipeline pipeline = new Pipeline(Host, Username, Database, Password);
        var extractor = new CSVExtractor(pipeline,
            @"C:\Users\Khosro\Desktop\StarAcademy\Summer1401-Project-Team03\server\TestData\input.csv");
        var loader =
            new CSVLoader(pipeline, extractor,
                @"C:\Users\Khosro\Desktop\StarAcademy\Summer1401-Project-Team03\server\TestData\output.csv");
        Console.WriteLine(loader.GetQuery());
    }
}