using System.IO;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.IO.IOInterfaces
{
    public interface ILogImporter
    {
        /// <summary>
        ///     Imports a log from the path
        /// </summary>
        /// <param name="path">path to the file with the log</param>
        /// <returns>Configurable log class</returns>
        ImportedEventLog LoadLog(string path);

        /// <summary>
        ///     Imports a log from the file stream
        /// </summary>
        /// <param name="stream">stream of file with the log</param>
        /// <returns>Configurable log class</returns>
        ImportedEventLog LoadLog(Stream stream);
    }
}