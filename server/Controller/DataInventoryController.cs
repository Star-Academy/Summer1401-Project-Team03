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
        var directory = new DirectoryInfo(@"resources\" + "exports");
        var files = directory.GetFiles("*");
        
        foreach (var file in files)
        {
            var fullName = file.Name;
            var regex = new Regex("(.*)_([0-9]*)\\.(csv|json)");

            var match = regex.Match(fullName);

            var name = match.Groups[1].Value;
            var id = match.Groups[2].Value;
            var type = match.Groups[3].Value;

            if (id == fileID.ToString())
            {
                var filePath = FilePathGenerator.Path(name, type, fileID, "exports");
                return new FileStreamResult(System.IO.File.Open(filePath, FileMode.Open), "text/plain");
            }
        }

        return NotFound("file not found");
    }

    [HttpGet]
    public ActionResult<List<FileInformation>> GetAllFiles()
    {
        var informations = new List<FileInformation>();
        extractInformation(informations, "imports");
        extractInformation(informations, "exports");

        return Ok(informations);
    }

    private void extractInformation(List<FileInformation> informations, string category)
    {
        var directory = new DirectoryInfo(@"resources\" + category);
        var files = directory.GetFiles("*");

        foreach (var file in files)
        {
            var fullName = file.Name;
            var regex = new Regex("(.*)_([0-9]*)\\.(csv|json)");

            var match = regex.Match(fullName);

            var name = match.Groups[1].Value;
            var id = match.Groups[2].Value;
            var type = match.Groups[3].Value;

            var information = new FileInformation(name, id, type, category, file.CreationTime.ToString());
            informations.Add(information);
        }
    }

    private void increaseFileID(int increament)
    {
        _fileID += increament;
    }
}