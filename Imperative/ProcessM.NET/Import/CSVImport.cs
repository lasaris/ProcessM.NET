using System.IO;
using LogImport.CsvImport;
using LogImport.Models;

namespace ProcessM.NET.Import
{
    /// <summary>
    ///  This class is a simple handler to reading CSV files and returning ImportedEventLog objects.
    ///  The rows are going to be implicitly numbered and the collumns are going to have strings as their identifiers, as provided in the CSV file.
    /// </summary>
    public static class CSVImport
    {
        /// <summary>
        /// Takes stream of a .csv file
        /// </summary>
        /// <param name="stream">Stream containing data of .csv file</param>
        /// <param name="hasHeaders">Boolean value indicating whether the .csv file contains headers, default is true.</param>
        /// <returns>ImportedEventLog object with its Contents field loaded with data from .csv file.</returns>
        public static ImportedEventLog MakeDataFrame(Stream stream, bool hasHeaders = true)
        {
            var logImporter = new CsvImporter();
            logImporter.HasHeaders = hasHeaders;
            return logImporter.LoadLog(stream);
        }

        /// <summary>
        /// Takes path of a .csv file
        /// </summary>
        /// <param name="path">Path containing data of .csv file</param>
        /// <param name="hasHeaders">Boolean value indicating whether the .csv file contains headers, default is true.</param>
        /// <returns>ImportedEventLog object with its Contents field loaded with data from .csv file.</returns>
        public static ImportedEventLog MakeDataFrame(string path, bool hasHeaders = true)
        {
            if (File.Exists(path))
            {
                var stream = File.OpenRead(path);
                return MakeDataFrame(stream, hasHeaders);
            }

            return null;
        }
    }
}
