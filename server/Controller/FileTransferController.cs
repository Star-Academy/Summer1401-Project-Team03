using DefaultNamespace;
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
            var filePath = Environment.CurrentDirectory + "\\resources" + "\\" + file.FileName + "_" + _fileID;

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            switch (file.ContentType)
            {
                case nameof(FileTypes.csv):
                    new CSVExtractor(_database, filePath, file.FileName).Extract();
                    break;
                case nameof(FileTypes.json):
                    new JSONExtractor(_database, filePath, file.FileName).Extract();
                    break;
            }

            return Ok();
        }

        return BadRequest("The sent file is empty!");
    }

    [HttpGet]
    public ActionResult<VirtualFileResult> Export(string fileName, int? fileID)
    {
        var filePath = Environment.CurrentDirectory + "\\resources" + "\\" + fileName + "_" + fileID;
        //return File(System.IO.File.Open(filePath, FileMode.Open));

        return File(filePath, "text/plain");
    }

    private void increaseFileID(int increament)
    {
        _fileID += increament;
    }
}