using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Deedle;
using ProcessM.NET.Model;
using LogImport.CsvImport;

namespace ProcessM.NET.Import
{
    /// <summary>
    ///  This class is a simple handler to reading CSV files into dataframes, both provided by Deedle library.
    ///  The rows are going to be implicitly numbered and the collumns are going to have strings as their identifiers, as provided in the CSV file.
    /// </summary>
    public static class CSVImport
    {
        /// <summary>
        /// Takes stream of a .csv file as well as other optional parameters for ReadCsv method of Deedle library 
        /// (a few being ommitted due to being unnecessary for the needs of this library).
        /// Full documentation of ReadCsv can be found here: https://collective2.com/c2explorer_help/html/92669ce2-62ff-f723-7a8e-3f72a59b489f.htm
        /// </summary>
        /// <param name="stream">Stream containing data of .csv file</param>
        /// <param name="hasHeaders">Boolean value indicating whether the .csv file contains headers, default is true.</param>
        /// <param name="inferTypes">Boolean value indicating whether primitive data types should be infered from loaded data, default is true.</param>
        /// <param name="culture">String value representing cultural info of loaded file in languagecode2-country/regioncode2 format such as "en-US".
        /// Default is InvariantCulture of CultureInfo.</param>
        /// <param name="separatorsString">String of one or multiple separator characters. Default is comma (",").</param>
        /// <param name="maxRows">Integer value indicating how many rows of .csv file should be loaded. Default is maximal value of integer.</param>
        /// <param name="missingValues">String array containing representation of missing values in .csv file. Default is ["NaN", "NA", "#N/A", ":", "-", "TBA", "TBD"].</param>
        /// <returns>ImportedEventLog object with its Contents field loaded with data from .csv file.</returns>
        public static LogImport.Models.ImportedEventLog MakeDataFrame(Stream stream,
            bool hasHeaders = true,
            bool inferTypes = true,
            string culture = "",
            string separatorsString = null,
            int maxRows = int.MaxValue,
            string[] missingValues = null)
        {
            if (string.IsNullOrEmpty(culture))
            {
                culture = CultureInfo.InvariantCulture.Name;
            }
            if (missingValues == null)
            {
                missingValues = new string[] { "NaN", "NA", "#N/A", ":", "-", "TBA", "TBD" }; // default value of ReadCsv
            }
            if (separatorsString == null)
            {
                separatorsString = CsvSeparatorDetector(stream, new char[] { ';', '|', '\t', ',' }).ToString();
            }
            var logImporter = new CsvImporter();
            logImporter.HasHeaders = hasHeaders;
            return logImporter.LoadLog(stream);
            // Frame<int, string> data = Frame.ReadCsv(stream, hasHeaders: hasHeaders, inferTypes: inferTypes, separators: separatorsString, culture: culture, maxRows: maxRows, missingValues: missingValues);
            // return new ImportedEventLog(importedLog);
        }

        /// <summary>
        /// Takes path of a .csv file as well as other optional parameters for ReadCsv method of Deedle library 
        /// (a few being ommitted due to being unnecessary for the needs of this library).
        /// Full documentation of ReadCsv can be found here: https://collective2.com/c2explorer_help/html/92669ce2-62ff-f723-7a8e-3f72a59b489f.htm
        /// </summary>
        /// <param name="path">Path containing data of .csv file</param>
        /// <param name="hasHeaders">Boolean value indicating whether the .csv file contains headers, default is true.</param>
        /// <param name="inferTypes">Boolean value indicating whether primitive data types should be infered from loaded data, default is true.</param>
        /// <param name="culture">String value representing cultural info of loaded file in languagecode2-country/regioncode2 format such as "en-US".
        /// Default is InvariantCulture of CultureInfo.</param>
        /// <param name="separatorsString">String of one or multiple separator characters. Default is comma (",").</param>
        /// <param name="maxRows">Integer value indicating how many rows of .csv file should be loaded. Default is maximal value of integer.</param>
        /// <param name="missingValues">String array containing representation of missing values in .csv file. Default is ["NaN", "NA", "#N/A", ":", "-", "TBA", "TBD"].</param>
        /// <returns>ImportedEventLog object with its Contents field loaded with data from .csv file.</returns>
        public static LogImport.Models.ImportedEventLog MakeDataFrame(string path,
            bool hasHeaders = true,
            bool inferTypes = true,
            string culture = "",
            string separatorsString = ",",
            int maxRows = int.MaxValue,
            string[] missingValues = null)
        {
            if (culture == null || culture == "")
            {
                culture = CultureInfo.InvariantCulture.Name;
            }
            if (missingValues == null)
            {
                missingValues = new string[] { "NaN", "NA", "#N/A", ":", "-", "TBA", "TBD" }; // default value of ReadCsv
            }

            var logImporter = new CsvImporter();
            logImporter.HasHeaders = hasHeaders;
            return logImporter.LoadLog(path);
            // Frame<int, string> data = Frame.ReadCsv(path, hasHeaders: hasHeaders, inferTypes: inferTypes, separators: separatorsString, culture: culture, maxRows: maxRows, missingValues: missingValues);
            // return new ImportedEventLog(data);
        }

        /// <summary>
        /// Takes stream of a .csv file and a array of chars.
        /// By frequency of used characters tries to guess the separator character.
        /// </summary>
        /// <param name="stream">Stream containing data of .csv file</param>
        /// <param name="candidates">Array containing candidates for SCV separator character.</param>
        /// <returns>Character that is used as a separator in .csv file.</returns>
        private static char CsvSeparatorDetector(Stream stream, IEnumerable<char> candidates)
        {
            var buffer = new byte[1024];

            stream.Read(buffer, 0, 1024);
            stream.Seek(0, SeekOrigin.Begin);

            var q = candidates.Select(sep => new
            { Separator = sep, Found = buffer.Count(ch => ch == sep) })
                .OrderByDescending(res => res.Found)
                .First();

            return q.Separator;
        }
    }
}
