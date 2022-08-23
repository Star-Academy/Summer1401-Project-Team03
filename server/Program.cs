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

public static class Program
{
    public static void Main(string[] args)
    {
        var dbConfiguration = DBConfigLoader.Load();
        var pipeline = new Pipeline(dbConfiguration.Host, dbConfiguration.Username, dbConfiguration.Database,
            dbConfiguration.Password);
        var extractor = new CSVExtractor(pipeline,
            @"E:\input.csv");

        var filter1 = new Filter(pipeline, "location", Operator.Equal, "Iran");
        var filter2 = new Filter(pipeline, "date", Operator.Equal, "2022-08-12");

        var loader = new CSVLoader(pipeline, filter2,
            @"E:\output.csv");

        filter1.PreviousComponents.Add(extractor);
        filter2.PreviousComponents.Add(filter1);

        pipeline.AddComponent(extractor);
        pipeline.AddComponent(filter1);
        pipeline.AddComponent(filter2);
        pipeline.AddComponent(loader);

        pipeline.Execute(3);
    }
}