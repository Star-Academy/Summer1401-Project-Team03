using System.Data.Common;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.configurations;
using server.databases;
using server.file;
using server.informatios;
using FileOperation = System.IO.File;

namespace server.controllers;

[ApiController]
[Route("[controller]/[Action]")]
public class DataInventoryController : ControllerBase
{
    [EnableCors("CorsPolicy")]
    [HttpPost]
    public async Task<IActionResult> Import(IFormFile file)
    {
        try
        {
            if (file.Length > 0)
            {
                var regex = new Regex("(.*)\\.(csv|json)");

                var match = regex.Match(file.FileName);

                var fileName = match.Groups[1].Value;
                var format = match.Groups[2].Value;

                var fileId = IdCounterHandler.LoadFileId();

                var filePath = PathGenerator.GenerateDataPath(fileName, format, fileId);

                IdCounterHandler.SaveFileId(fileId + 1);
                await using (var stream = FileOperation.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok(fileId);
            }

            return BadRequest("The sent file is empty!");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpGet]
    public async Task<ActionResult> Export(int fileId)
    {
        try
        {
            var filePath = FileSearcher.Search(fileId, "user_file");
            var bytes = await FileOperation.ReadAllBytesAsync(filePath);
            return File(bytes, "text/plain", Path.GetFileName(filePath));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpGet]
    public ActionResult<List<FileInformation>> GetFilesInformation()
    {
        try
        {
            var informations = new List<FileInformation>();
            FileInformation.ExtractInformation(informations, "user_files");

            return Ok(informations);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpDelete]
    public IActionResult Delete(int fileId)
    {
        try
        {
            var filePath = FileSearcher.Search(fileId, "user_files");
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
    public IActionResult Rename(int fileId, string newName)
    {
        try
        {
            var filePath = FileSearcher.Search(fileId, "user_files");
            var fileInfo = new FileInfo(filePath);

            var regex = new Regex(".*_[0-9]*\\.(csv|json)");
            var fileType = regex.Match(fileInfo.Name).Groups[1].Value;
            var newPath = PathGenerator.GenerateDataPath(newName, fileType, fileId);
            fileInfo.MoveTo(newPath);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [EnableCors("CorsPolicy")]
    [HttpGet]
    public IActionResult GetSample(int fileId, int count)
    {
        try
        {
            var filePath = FileSearcher.Search(fileId, "user_files");
            var database = new PostgresDatabase(DbConfigLoader.Load());
            var queryBuilder = new PostgresQueryBuilder();
            var tableName = queryBuilder.NewAlias();
            var keys = new StreamReader(filePath).ReadLine().Replace("\\s+", "").Split(",").ToList();
            database.Execute(queryBuilder.Drop(tableName)).Close();
            database.Execute(queryBuilder.CreateTable(tableName, keys)).Close();
            database.Execute(queryBuilder.ImportCSV(tableName, keys, filePath)).Close();
            var table = queryBuilder.Select(keys,queryBuilder.SelectTable(tableName), queryBuilder.NewAlias());
            
            var query = queryBuilder.Sample(table, queryBuilder.NewAlias(), count);
            using var sampleData = database.Execute(query);
            var output = Serialize(sampleData);
            sampleData.Close();
            database.Execute(queryBuilder.Drop(tableName)).Close();
            
            return Ok(output);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    private List<Dictionary<string, object>> Serialize(DbDataReader reader)
    {
        var results = new List<Dictionary<string, object>>();
        var cols = new List<string>();
        for (var i = 0; i < reader.FieldCount; i++)
            cols.Add(reader.GetName(i));

        var j = 0;
        while (reader.Read())
        {
            results.Add(cols.ToDictionary(col => col, col => reader[col]));
            if (j++ > 50) break;
        }

        return results;
    }
}