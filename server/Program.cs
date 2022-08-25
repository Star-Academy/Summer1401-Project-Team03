var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
    
    
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});


var app = builder.Build();

app.UseCors("CorsPolicy");

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


// using a;
// using server.Components.Extractors;
// using server.Components.Loaders;
// using server.Components.Transformers;
// using server.Pipelines;

// public static class Program
// {
//     public static void Main(string[] args)
//     {
//         var dbConfiguration = DBConfigLoader.Load();
//         var pipeline = new Pipeline(dbConfiguration.Host, dbConfiguration.Username, dbConfiguration.Database,
//             dbConfiguration.Password);
//         var extractor = new CSVExtractor(pipeline,
//             @"C:\Users\Khosro\Desktop\StarAcademy\Summer1401-Project-Team03\server\TestData\input.csv");
//
//         // var filter1 = new Filter(pipeline, "location", Operator.Equal, "Iran");
//         // filter1.PreviousComponents.Add(extractor);
//         // var filter2 = new Filter(pipeline, "date", Operator.Equal, "2022-08-12");
//         // filter2.PreviousComponents.Add(filter1);
//
//         var selector = new FieldSelector(pipeline, new List<string> {"iso_code", "location"});
//         selector.PreviousComponents.Add(extractor);
//
//         var loader = new CSVLoader(pipeline, selector,
//             @"C:\Users\Khosro\Desktop\StarAcademy\Summer1401-Project-Team03\server\TestData\output.csv");
//
//         pipeline.AddComponent(loader);
//
//         pipeline.Execute(2);
//     }
// }