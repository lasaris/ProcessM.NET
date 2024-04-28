using LogImport.Models;

namespace LogImport.Interfaces;

/// <summary>
///   Interface for importing event logs
/// </summary>
public interface ILogImporter
{
    /// <summary>
    ///     Method containing the logic of loading an event log from a file represented by a path parameter
    /// </summary>
    /// <param name="filePath">Path to the file, where log is stored</param>
    /// <returns><see cref="ImportedEventLog"/></returns>
    ImportedEventLog LoadLog(string filePath);

    /// <summary>
    ///    Method containing the logic of loading an event log from a stream
    /// </summary>
    /// <param name="stream">Opened stream, from which the method can read</param>
    /// <returns><see cref="ImportedEventLog"/></returns>
    ImportedEventLog LoadLog(Stream stream);
}