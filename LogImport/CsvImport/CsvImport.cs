
using LogImport.Models;

namespace LogImport.CsvImport
{
    /// <summary>
    ///    Class responsible for importing of csv files
    /// </summary>
    public static class CsvImport
    {
        /// <summary>
        ///     Imports a csv log from the path
        /// </summary>
        /// <param name="path">Path to a CSV file to be parsed into an Event Log</param>
        /// <returns>ImportedEventLog based on the file content</returns>
        public static ImportedEventLog LoadLog(string path, bool hasHeaders = true, char separator = ';')
        {
            Stream stream = new FileStream(path, FileMode.Open);

            return LoadLog(stream, hasHeaders, separator);
        }

        /// <summary>
        ///     Imports a csv log from the file stream
        /// </summary>
        /// <param name="stream">CSV file parsed as Stream</param>
        /// <returns>ImportedEventLog</returns>
        public static ImportedEventLog LoadLog(Stream stream, bool hasHeaders = true, char separator = ';')
        {
            var columns = new List<LogColumn>();

            using var reader = new StreamReader(stream);

            while (!reader.EndOfStream)
            {
                var line = reader.ReadLine();

                if (string.IsNullOrWhiteSpace(line))
                {
                    continue;
                }

                if (!columns.Any() && hasHeaders)
                {
                    columns = ProcessHeaders(line, separator);
                    continue;
                }

                var parsedLine = ParseLine(line, separator);

                if (columns.Count == 0)
                {
                    for (int i = 0; i < parsedLine.Length; i++)
                    {
                        columns.Add(new LogColumn(i.ToString(), new List<string>()));
                    }
                }

                for (int i = 0; i < columns.Count; i++)
                {
                    var column = columns.ElementAt(i);
                    column.Values = column.Values.Append(parsedLine[i]);
                }
            }

            return new ImportedEventLog(columns);
        }


        /// <summary>
        ///     Processes a csv line with headers
        /// </summary>
        /// <param name="line">String line with headers</param>
        /// <param name="separator">Character separating the CSV headers</param>
        /// <returns>Returns a list of new LogColumns with empty values</returns>
        private static List<LogColumn> ProcessHeaders(string line, char separator)
        {
            var columns = new List<LogColumn>();
            string[] headers = ParseLine(line, separator);

            foreach (var header in headers)
            {
                columns.Add(new LogColumn(header, new List<string>()));
            }

            return columns;
        }


        /// <summary>
        ///     Processes a CSV line
        /// </summary>
        /// <param name="line">String line with headers</param>
        /// <param name="separator">Character separating the CSV headers</param>
        /// <returns>Returns an array of strings, which are the csv values for each column</returns>
        private static string[] ParseLine(string line, char separator)
        {
            return line.Split(separator);
        }
    }
}