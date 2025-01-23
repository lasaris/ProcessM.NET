
using LogImport.Exceptions;
using LogImport.Interfaces;
using LogImport.Models;
using Microsoft.VisualBasic.FileIO;

namespace LogImport.CsvImport
{
    /// <summary>
    ///    Class responsible for importing of CSV files
    /// </summary>
    public class CsvImporter : ILogImporter
    {
        private char? _delimiter;
        private char[] _delimiterCandidates = new[] { ';', '|', '\t', ',' };
        private string[] _missing = new[] { "none", "null", "nan", "na", "-", "" };
        private bool _hasHeaders = true;

        /// <summary>
        ///   Delimiter used in the CSV file
        /// </summary>
        public char? Delimiter { get => _delimiter; set => _delimiter = value; }

        /// <summary>
        ///   Array of strings that are considered as missing values
        /// </summary>
        public string[] Missing { get => _missing; set => _missing = value; }

        /// <summary>
        ///   Flag indicating whether the CSV file has headers
        /// </summary>
        public bool HasHeaders { get => _hasHeaders; set => _hasHeaders = value; }

        /// <summary>
        ///  Default constructor
        /// </summary>
        public CsvImporter() { }

        /// <summary>
        ///  Overriden method from the interface <see cref="ILogImporter"/>
        /// </summary>
        /// <param name="filePath">string path to the file, that is being imported</param>
        /// <returns><see cref="ImportedEventLog"/></returns>
        public ImportedEventLog LoadLog(string filePath)
        {
            try
            {
                var stream = File.OpenRead(filePath);
                return LoadLog(stream);
            }
            catch (FileNotFoundException)
            {
                throw new CannotParseFileException("File not found.");
            }
            catch (IOException)
            {
                throw new CannotParseFileException("File is in use.");
            }
            catch (UnauthorizedAccessException)
            {
                throw new CannotParseFileException("Access denied.");
            }
            catch (Exception e)
            {
                throw new CannotParseFileException(e.Message);
            }
        }

        /// <summary>
        ///     Method containing the logic of loading an event log from a stream
        /// </summary>
        /// <param name="stream">Opened stream</param>
        /// <returns><see cref="ImportedEventLog"/></returns>
        /// <exception cref="CannotParseFileException">This exception is thrown, if the file doesn't contain headers, and we cannot create custom ones by the first row (for headers creation I need their length)</exception>
        public ImportedEventLog LoadLog(Stream stream)
        {
            if (this._delimiter == null)
            {
                _delimiter = DetectCsvDelimiter(stream, _delimiterCandidates);
            }

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

            if (_hasHeaders && logRows.Count > 0)
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

        /// <summary>
        ///    Method responsible for detecting the delimiter of the CSV file
        /// </summary>
        /// <param name="stream">Open stream</param>
        /// <param name="candidates">Candidate delimiters</param>
        /// <returns>Delimiter character</returns>
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
}