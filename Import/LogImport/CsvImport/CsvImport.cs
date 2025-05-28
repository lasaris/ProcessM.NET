using CsvHelper;
using CsvHelper.Configuration;
using LogImport.Exceptions;
using LogImport.Interfaces;
using LogImport.Models;
using System.Globalization;
using System.Text;

namespace LogImport.CsvImport;

/// <summary>
/// Minimal CSV importer using CsvHelper
/// </summary>
public class CsvImporter : ILogImporter
{
    public char? Delimiter { get; set; }
    public bool HasHeaders { get; set; } = true;

    public ImportedEventLog LoadLog(string filePath)
    {
        try
        {
            using var stream = File.OpenRead(filePath);
            return LoadLog(stream);
        }
        catch (Exception ex) when (
            ex is FileNotFoundException ||
            ex is IOException ||
            ex is UnauthorizedAccessException ||
            ex is ReaderException)
        {
            throw new CannotParseFileException(ex.Message);
        }
    }

    public ImportedEventLog LoadLog(Stream stream)
    {
        using var reader = new StreamReader(stream, Encoding.UTF8, leaveOpen: true);
        stream.Seek(0, SeekOrigin.Begin);

        this.Delimiter ??= DetectCsvDelimiter(stream, new[] { ';', '|', '\t', ',' });

        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HasHeaderRecord = HasHeaders,
            Delimiter = this.Delimiter.ToString(),
            IgnoreBlankLines = true,
            TrimOptions = TrimOptions.Trim,
            BadDataFound = null,
            MissingFieldFound = null,
        };

        using var csv = new CsvReader(reader, config);

        var rows = new List<string[]>();
        string[] headers;

        if (HasHeaders)
        {
            csv.Read();
            csv.ReadHeader();
            headers = csv.HeaderRecord!;
        }
        else
        {
            if (!csv.Read() || csv.Parser.Record == null)
                throw new CannotParseFileException("Empty file or unreadable data.");
            
            var first = csv.Parser.Record!;
            headers = Enumerable.Range(0, first.Length).Select(i => $"Column {i + 1}").ToArray();
            rows.Add(first);
        }

        while (csv.Read())
        {
            var row = csv.Parser.Record;
            if (row != null)
            {
                rows.Add(row);
            }
        }

        return new ImportedEventLog(rows, headers);
    }

    private static char DetectCsvDelimiter(Stream stream, IEnumerable<char> candidates)
    {
        var buffer = new byte[1024];

        stream.Read(buffer, 0, 1024);
        stream.Seek(0, SeekOrigin.Begin);

        var q = candidates.Select(sep => new
        { Separator = sep, Found = buffer.Count(ch => ch == sep) });

        return q.OrderByDescending(x => x.Found).First().Separator;
    }
}
