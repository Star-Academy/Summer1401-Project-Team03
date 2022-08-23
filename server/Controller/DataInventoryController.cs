using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using server.Databases;
using server.Enums;

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
            Regex regex = new Regex("(.*)\\.(csv|json)");

         
            var match = regex.Match(file.FileName);
            
            var fileName = match.Groups[1].Value;
            var format = match.Groups[2].Value;
                
            var filePath = Environment.CurrentDirectory + "\\resources\\imports\\" + fileName + "_" + _fileID + "." + format;

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            return Ok();
        }

        return BadRequest("The sent file is empty!");
    }

    [HttpGet]
    public IActionResult Export(string fileName, string fileType, int fileID)
    {
        var filePath = Environment.CurrentDirectory + "\\resources\\exports\\" + fileName + "_" + fileID + "." + fileType;
        return new FileStreamResult(System.IO.File.Open(filePath, FileMode.Open), "text/plain");
    }

    private void increaseFileID(int increament)
    {
        _fileID += increament;
    }
}