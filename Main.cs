namespace System.Data.Common;
using server.Components.Extractors;
using server.Components.Loaders;
using server.Databases;
public class Main
{
    private const string Host = "localhost";
    private const string Username = "postgres";
    private const string Database = "postgres";
    private const string Password = "Khosro1381";

    public static void Main(string[] args)
    {
        var database = new PostgresDatabase(Host, Username, Database, Password);
        var extractor = new CSVExtractor(database, "ez",
            "C:\\Users\\Khosro\\Desktop\\StarAcademy\\Summer1401-Project-Team03\\server\\TestData\\input.csv");
        var loader =
            new CSVLoader(database, extractor,
                "C:\\Users\\Khosro\\Desktop\\StarAcademy\\Summer1401-Project-Team03\\server\\TestData\\output.csv");
        Console.WriteLine(loader.GetQuery());
    }
}


// var builder = WebApplication.CreateBuilder(args);
// var app = builder.Build();
//
// app.MapGet("/", () => "Hello Worl
