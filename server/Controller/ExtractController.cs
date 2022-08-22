using System.Net;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;
using server.Extract;

namespace server.Controller;

[ApiController]
[Route("[controller]/[Action]")]
public class FileTransferController : ControllerBase
{
    private static int _fileID = 0;
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
                    new CSVExtractor(filePath, file.FileName).Extract();
                    break;
                case nameof(FileTypes.json):
                    new JSONExtractor(filePath, file.FileName).Extract();
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