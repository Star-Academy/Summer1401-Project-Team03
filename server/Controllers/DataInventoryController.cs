using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Databases;
using server.file;
using FileOperation = System.IO.File;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class DataInventoryController : ControllerBase
{
    private PostgresDatabase _database;

    [EnableCors("CorsPolicy")]
    [HttpPost]
    public async Task<IActionResult> Import(IFormFile file)
    {
        if (file.Length > 0)
        {
            var regex = new Regex("(.*)\\.(csv|json)");

            var match = regex.Match(file.FileName);

            var fileName = match.Groups[1].Value;
            var format = match.Groups[2].Value;

            var fileID = IDCounterHandler.LoadFileID();
             
            var filePath = PathGenerator.GenerateDataPath(fileName, format, fileID, "imports");
            
            IDCounterHandler.SaveFileID(fileID + 1);
            using (var stream = FileOperation.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(fileID);
        }

        return BadRequest("The sent file is empty!");
    }

    [EnableCors("CorsPolicy")]
    [HttpGet]
    public IActionResult Export(int fileID)
    {
        try
        {
            var filePath = FileSearcher.Search(fileID, "exports");
            return new FileStreamResult(FileOperation.Open(filePath, FileMode.Open), "text/plain");
        }
        catch (Exception e)
        {
            return BadRequest("file not found!");
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpGet]
    public ActionResult<List<FileInformation>> GetFilesInformation()
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

    [EnableCors("CorsPolicy")]
    [HttpDelete]
    public IActionResult Delete(int fileID, string category)
    {
        try
        {
            var filePath = FileSearcher.Search(fileID, category);
            FileOperation.Delete(filePath);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpPut]
    public IActionResult Rename(int fileID, string category, string newName)
    {
        try
        {
            var filePath = FileSearcher.Search(fileID, category);
            var fileInfo = new FileInfo(filePath);
            
            var regex = new Regex(".*_[0-9]*\\.(csv|json)");
            var fileType = regex.Match(fileInfo.Name).Groups[1].Value;
            var newPath = PathGenerator.GenerateDataPath(newName, fileType, fileID, category);
            fileInfo.MoveTo(newPath);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}