var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

// Test -------------------------

// using server.Components.Extractors;
// using server.Components.Loaders;
// using server.Pipelines;
//
// public static class Program
// {
//     private const string Host = "localhost";
//     private const string Username = "postgres";
//     private const string Database = "postgres";
//     private const string Password = "Khosro1381";
//
//     public static void Main(string[] args)
//     {
//         var pipeline = new Pipeline(Host, Username, Database, Password);
//         var extractor = new CSVExtractor(pipeline,
//             @"C:\Users\Khosro\Desktop\StarAcademy\Summer1401-Project-Team03\server\TestData\input.csv");
//         var loader =
//             new CSVLoader(pipeline, extractor,
//                 @"C:\Users\Khosro\Desktop\StarAcademy\Summer1401-Project-Team03\server\TestData\output.csv");
//         Console.WriteLine(loader.GetQuery());
//     }
// }