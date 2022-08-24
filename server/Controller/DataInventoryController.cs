using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using server.Databases;
using server.file;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class DataInventoryController : ControllerBase
{
    private static int _fileID;
    private PostgresDatabase _database;

    [HttpPost]
    public async Task<IActionResult> Import(IFormFile file)
    {
        if (file.Length > 0)
        {
            increaseFileID(1);
            var regex = new Regex("(.*)\\.(csv|json)");


            var match = regex.Match(file.FileName);

            var fileName = match.Groups[1].Value;
            var format = match.Groups[2].Value;

            var filePath = FilePathGenerator.Path(fileName, format, _fileID, "imports");

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            return Ok();
        }

        return BadRequest("The sent file is empty!");
    }

    [HttpGet]
    public IActionResult Export(int fileID)
    {
        try
        {
            var filePath = FileSearcher.Search(fileID, "exports");
            return new FileStreamResult(System.IO.File.Open(filePath, FileMode.Open), "text/plain");
        }
        catch (Exception e)
        {
            return BadRequest("file not found!");
        }
    }

    [HttpGet]
    public ActionResult<List<FileInformation>> GetAllFiles()
    {
        try
        {
            var informations = new List<FileInformation>();
            FileInformation.ExtractInformation(informations, "imports");
            FileInformation.ExtractInformation(informations, "exports");

            return Ok(informations);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    private void increaseFileID(int increament)
    {
        _fileID += increament;
    }
}