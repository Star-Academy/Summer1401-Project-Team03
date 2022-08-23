// var builder = WebApplication.CreateBuilder(args);
//
// // Add services to the container.
//
// builder.Services.AddControllers();
// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
//
// builder.Services.AddSwaggerGen();
//
// var app = builder.Build();
//
// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
//
// app.UseHttpsRedirection();
//
// app.UseAuthorization();
//
// app.MapControllers();
//
// app.Run();

using a;
using server.Components.Extractors;
using server.Components.Loaders;
using server.Components.Transformers;
using server.Enums;
using server.Pipelines;
using server.Transform;

public static class Program
{
    public static void Main(string[] args)
    {
        var dbConfiguration = DBConfigLoader.Load();
        var pipeline = new Pipeline(dbConfiguration.Host, dbConfiguration.Username, dbConfiguration.Database,
            dbConfiguration.Password);
        var extractor = new CSVExtractor(pipeline,
            @"C:\Users\Khosro\Desktop\StarAcademy\Summer1401-Project-Team03\server\TestData\input.csv");

        var replicate = new Replicate(pipeline);
        
        var filter1 = new Filter(pipeline, "location", Operator.Equal, "Iran");
        var filter2 = new Filter(pipeline, "date", Operator.Equal, "2022-08-12");

        var loader1 = new CSVLoader(pipeline, filter1,
            @"C:\Users\Khosro\Desktop\StarAcademy\Summer1401-Project-Team03\server\TestData\output1.csv");
        var loader2 = new CSVLoader(pipeline, filter2,
            @"C:\Users\Khosro\Desktop\StarAcademy\Summer1401-Project-Team03\server\TestData\output2csv");

        replicate.PreviousComponents.Add(extractor);
        filter1.PreviousComponents.Add(replicate);
        filter2.PreviousComponents.Add(replicate);
        
        pipeline.AddComponent(loader1);
        pipeline.AddComponent(loader2);

        pipeline.Execute(4).Close();
        pipeline.Execute(5).Close();
    }
}