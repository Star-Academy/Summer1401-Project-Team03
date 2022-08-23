using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using server.Components.Extractors;
using server.Databases;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class FileTransferController : ControllerBase
{
    private static int _fileID;
    private PostgresDatabase _database;

    [HttpPost]
    public async Task<IActionResult> Import(IFormFile file)
    {
        if (file.Length > 0)
        {
            increaseFileID(1);
            var filePath = Environment.CurrentDirectory + "\\resources" + "\\" + file.FileName;

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            Regex filter = new("(csv|json/text)");

            switch (filter.Match(file.ContentType).Value)
            {
                case nameof(FileTypes.csv):
                    new CSVExtractor(_database, file.FileName, filePath).GetQuery();
                    break;
                case nameof(FileTypes.json):
                    new JSONExtractor(_database, file.FileName, filePath).Extract();
                    break;
            }

            return Ok();
        }

        return BadRequest("The sent file is empty!");
    }

    [HttpGet]
    public IActionResult Export(string fileName, int fileID)
    {
        var filePath = Environment.CurrentDirectory + "\\resources" + "\\" + fileName + "_" + fileID;
        return new FileStreamResult(System.IO.File.Open(filePath, FileMode.Open), "text/plain");
    }


    private void increaseFileID(int increament)
    {
        _fileID += increament;
    }
}