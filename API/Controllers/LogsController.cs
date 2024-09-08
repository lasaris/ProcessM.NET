using LogImport.CsvImport;
using LogImport.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/log")]
public class LogsController: ControllerBase
{
    [HttpPost]
    public ActionResult<ImportedEventLog> UploadLog(IFormFile file)
    {
        var stream = file.OpenReadStream();

        var importer = new CsvImporter();
        var importedEventLog = importer.LoadLog(stream);

        return CreatedAtAction(nameof(UploadLog), importedEventLog);
    }
}