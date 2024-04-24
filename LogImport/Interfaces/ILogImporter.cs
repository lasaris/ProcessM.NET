using LogImport.Models;

namespace LogImport.Interfaces;

public interface ILogImporter
{
    ImportedEventLog LoadLog(string filePath);

    ImportedEventLog LoadLog(Stream stream);
}