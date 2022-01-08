using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using DeclarativePM.Lib.IO.IOInterfaces;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.IO.Import
{
    /// <summary>
    ///     Class responsible for import of logs and models
    /// </summary>
    public class CsvLogImporter : ILogImporter
    {
        /// <summary>
        ///     Imports a csv log from the path
        /// </summary>
        /// <param name="path">path to the file with the log</param>
        /// <returns>Configurable log class</returns>
        public ImportedEventLog LoadLog(string path)
        {
            return LoadLog(path, true);
        }

        /// <summary>
        ///     Imports a csv log from the file stream
        /// </summary>
        /// <param name="stream">stream of file with the log</param>
        /// <returns>Configurable log class</returns>
        public ImportedEventLog LoadLog(Stream stream)
        {
            return LoadLog(stream, true);
        }

        /// <summary>
        ///     Imports a csv log from the file stream
        /// </summary>
        /// <param name="stream">stream of file with the log</param>
        /// <param name="hasHeaders">File contains headers</param>
        /// <param name="missing">
        ///     How is missing value in the csv specified
        ///     By default "none", "null", "nan", "na", "-" and empty string are
        ///     considered as missing values in the .csv file
        /// </param>
        /// <param name="separator">csv separator</param>
        /// <returns>Configurable log class</returns>
        public ImportedEventLog LoadLog(Stream stream, bool hasHeaders, string[] missing = null, char separator = ',')
        {
            var logs = new List<string[]>();
            string[] headers = null;
            //Which values in csv can be interpreted as missing
            missing ??= new[] {"none", "null", "nan", "na", "-"};
            using var csv = new StreamReader(stream);

            while (!csv.EndOfStream)
            {
                var line = csv.ReadLine();
                if (string.IsNullOrWhiteSpace(line))
                    continue;
                var values =
                    Regex.Split(line, $"{separator}(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"); //strings in quotes wont be split
                if (hasHeaders && headers is null)
                {
                    headers = values;
                    continue;
                }

                //if no headers were defined we name each column by number from 0 to lenght - 1
                headers ??= Enumerable.Range(0, values.Length).Select(i => i.ToString()).ToArray();
                //if some values are missing we use null instead
                values = values.Select(v =>
                    missing.Contains(v.ToLower()) || string.IsNullOrWhiteSpace(v) ? string.Empty : v).ToArray();
                if (values.Length == headers.Length)
                    logs.Add(values);
            }

            return new ImportedEventLog(logs, headers);
        }

        /// <summary>
        ///     Imports a csv log from the path
        /// </summary>
        /// <param name="path">path to the file with the log</param>
        /// <param name="hasHeaders">File contains headers</param>
        /// <param name="missing">How is missing value in the csv specified</param>
        /// <param name="separator">csv separator</param>
        /// <returns>Configurable log class</returns>
        public ImportedEventLog LoadLog(string path, bool hasHeaders, string[] missing = null,
            char separator = ',')
        {
            if (!File.Exists(path))
                return null;

            var stream = File.OpenRead(path);

            var result = LoadLog(stream, hasHeaders, missing, separator);
            stream.Dispose();
            return result;
        }
    }
}