using API.Models;
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
        if (string.IsNullOrEmpty(csvSeparator) || file == null)
        {
            return BadRequest("No CsvSeparator or File were provided");
        }

        var stream = file.OpenReadStream();

        var importer = new CsvImporter
        {
            Delimiter = csvSeparator[0]
        };

        var importedEventLog = importer.LoadLog(stream);

        return CreatedAtAction(nameof(UploadLog), importedEventLog);
    }

    [HttpPost]
    [Route("timestamp")]
    public ActionResult<string> TrySetTimestamp(ImportedEventLogAPI importedEventLogAPI)
    {
        var importedEventLog = importedEventLogAPI.SerializeImportedEventLogAPI();

        if (importedEventLog == null)
        {
            return BadRequest("Unable to parse the imported event log");
        }

        List<string> timestampFormats = new()
        {
            "yyyy-MM-dd HH:mm:ss",      // 2024-10-09 13:45:30
            "yyyy/MM/dd HH:mm:ss",      // 2024/10/09 13:45:30
            "yyyy-MM-ddTHH:mm:ss",      // 2024-10-09T13:45:30
            "yyyy-MM-ddTHH:mm:ss.fffZ", // 2024-10-09T13:45:30.123Z (ISO 8601 with milliseconds)
            "yyyyMMddHHmmss",           // 20241009134530 (Compact format)
            "dd-MM-yyyy HH:mm:ss",      // 09-10-2024 13:45:30
            "dd/MM/yyyy HH:mm:ss",      // 09/10/2024 13:45:30
            "MM/dd/yyyy HH:mm:ss",      // 10/09/2024 13:45:30
            "MM/dd/yyyy HH:mm",      // 10/09/2024 13:45
            "dddd, dd MMMM yyyy HH:mm:ss",  // Wednesday, 09 October 2024 13:45:30 (Verbose)
            "yyyy-MM-dd HH:mm:ss.fff",  // 2024-10-09 13:45:30.123 (With milliseconds)
            "yyyy-MM-dd HH:mm:ssK",     // 2024-10-09 13:45:30+02:00 (with time zone)
            "O",                        // 2024-10-09T13:45:30.1234567+02:00 (Round-trip ISO 8601)
            "R",                        // Wed, 09 Oct 2024 13:45:30 GMT (RFC1123)
            "u",                        // 2024-10-09 13:45:30Z (UTC sortable)
        };

        for (int i = 0; i < timestampFormats.Count; i++)
        {
            var timestampFormat = timestampFormats[i];

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