using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;
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
            var filePath = Environment.CurrentDirectory + "\\resources" + "\\" + file.FileName + _fileID;
            
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

    // [HttpGet]
    // public ActionResult<IFormFile> Export()
    // {
    //     
    // }

    private void increaseFileID(int increament)
    {
        _fileID += increament;
    }
}