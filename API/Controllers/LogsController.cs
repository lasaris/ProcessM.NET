using System.Diagnostics.CodeAnalysis;
using API.Models;
using API.Utils;
using LogImport.CsvImport;
using LogImport.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/import/log")]
public class LogsController : ControllerBase
{
    [HttpPost]
    public ActionResult<ImportedEventLog> UploadLog([FromForm] IFormFile? file, [FromForm] string? csvSeparator)
    {
        if (file == null)
        {
            return BadRequest("No File was provided");
        }

        var stream = file.OpenReadStream();

        var importer = new CsvImporter { };

        if (!string.IsNullOrEmpty(csvSeparator))
        {
            importer.Delimiter = csvSeparator[0];
        }

        var importedEventLog = importer.LoadLog(stream);

        return CreatedAtAction(nameof(UploadLog), importedEventLog);
    }

    [HttpPost]
    [Route("timestamp")]
    public ActionResult<string> TrySetTimestamp(ImportedEventLogDTO importedEventLogDto)
    {
        var importedEventLog = importedEventLogDto.SerializeImportedEventLogAPI();

        if (importedEventLog == null)
        {
            return BadRequest("Unable to parse the imported event log");
        }

        for (int i = 0; i < Utilities.CommonTimestampFormats.Count; i++)
        {
            var timestampFormat = Utilities.CommonTimestampFormats[i];

            var currentResult = importedEventLog.TrySetTimestampFormat(timestampFormat);

            if (currentResult)
            {
                return Ok(timestampFormat);
            }
        }

        return NotFound();
    }

    [HttpPost]
    [Route("timestamp/format")]
    public ActionResult<string> SetTimestampManual(LogWithTimestampFormatAPI logWithTimestampFormat)
    {

        var importedEventLog = logWithTimestampFormat.ImportedLog?.SerializeImportedEventLogAPI();

        if (importedEventLog == null)
        {
            return BadRequest();
        }

        var timestampFormat = logWithTimestampFormat.TimestampFormat;

        if (timestampFormat == null)
        {
            return BadRequest();
        }

        var result = importedEventLog.TrySetTimestampFormat(timestampFormat);

        if (!result)
        {
            return StatusCode(StatusCodes.Status406NotAcceptable);
        }

        return Ok();
    }
}