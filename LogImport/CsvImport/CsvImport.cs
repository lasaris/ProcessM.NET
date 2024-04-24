
using LogImport.Exceptions;
using LogImport.Interfaces;
using LogImport.Models;
using Microsoft.VisualBasic.FileIO;

namespace LogImport.CsvImport
{
    /// <summary>
    ///    Class responsible for importing of CSV files
    /// </summary>
    public class CsvImport : ILogImporter
    {
        private char _delimiter = ',';
        private string[] _missing = new[] { "none", "null", "nan", "na", "-", "" };
        private bool _hasHeaders = true;

        public char Delimiter { get => _delimiter; set => _delimiter = value; }
        public string[] Missing { get => _missing; set => _missing = value; }
        public bool HasHeaders { get => _hasHeaders; set => _hasHeaders = value; }

        public CsvImport() { }

        public ImportedEventLog LoadLog(string filePath)
        {
            var stream = File.OpenRead(filePath);
            return LoadLog(stream);
        }

        public ImportedEventLog LoadLog(Stream stream)
        {
            var logRows = new List<string[]>();

            using (var parser = new TextFieldParser(stream))
            {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(_delimiter.ToString());

                while (!parser.EndOfData)
                {
                    var row = parser.ReadFields();

                    if (row == null)
                    {
                        continue;
                    }

                    logRows.Add(row);
                }
            }

            if (_hasHeaders)
            {
                var fileHeaders = logRows[0];
                logRows.RemoveAt(0);

                return new ImportedEventLog(logRows, fileHeaders);
            }

            if (logRows.Count == 0)
            {
                throw new CannotParseFileException("Unable to parse file. No rows found.");
            }

            var firstLineLength = logRows[0].Length;
            var headers = new string[firstLineLength];
            for (var i = 0; i < firstLineLength; i++)
            {
                headers[i] = $"Column {i + 1}";
            }

            return new ImportedEventLog(logRows, headers);
        }
    }
}