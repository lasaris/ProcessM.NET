using LogImport.Models;
using LogImport.Exceptions;
using LogImport.CsvImport;
using LogImport.Interfaces;
using System.IO;

namespace LogImport.Tests
{
    public class CSVImportingTests
    {
        static readonly string workingDirectory = Environment.CurrentDirectory;
        static readonly string projectDirectory = Directory.GetParent(workingDirectory)!.Parent!.Parent!.FullName;
        private readonly string filesPath = Path.Combine(projectDirectory, "Files");

        [Theory]
        [InlineData("alpha.csv", ',', 2, 6)]
        [InlineData("alpha1.csv", ';', 2, 6)]
        [InlineData("alpha3.csv", ',', 3, 6)]
        public void ImportLogFilePath_DefaultLog_RowColumnCount(string fileName, char delimiter, int expectedColumnCount, int expectedRowCount)
        {
            // Arrange
            CsvImporter csvImporter = new()
            {
                Delimiter = delimiter
            };

            // Act
            var filePath = Path.Combine(filesPath, fileName);
            var importedEventLog = csvImporter.LoadLog(filePath);

            // Assert
            Assert.Equal(expectedRowCount, importedEventLog.RowCount);
            Assert.Equal(expectedColumnCount, importedEventLog.ColumnCount);
        }

        [Theory]
        [InlineData("alpha.csv", ',', 2, 6)]
        [InlineData("alpha1.csv", ';', 2, 6)]
        [InlineData("alpha3.csv", ',', 3, 6)]
        public void ImportLogFileStream_DefaultLog_RowColumnCount(string fileName, char delimiter, int expectedColumnCount, int expectedRowCount)
        {
            // Arrange
            CsvImporter csvImporter = new()
            {
                Delimiter = delimiter
            };

            // Act
            var path = Path.Combine(filesPath, fileName);
            var stream = File.OpenRead(path);
            var importedEventLog = csvImporter.LoadLog(stream);

            // Assert
            Assert.Equal(expectedRowCount, importedEventLog.RowCount);
            Assert.Equal(expectedColumnCount, importedEventLog.ColumnCount);
        }

        [Theory]
        [InlineData("alpha.txt")]
        [InlineData("nonsense.csv")]
        [InlineData("")]
        public void ImportLogFilePath_NonExistentFile_ThrowError(string fileName)
        {
            CsvImporter csvImporter = new();

            // Act
            var path = Path.Combine(filesPath, fileName);
            ImportedEventLog import() => csvImporter.LoadLog(path);

            // Assert
            Assert.Throws<CannotParseFileException>(import);
        }

        [Fact]
        public void Import_EmptyFileWithHeaders_ThrowError()
        {
            CsvImporter csvImporter = new();

            // Act
            var path = Path.Combine(filesPath, "empty.csv");
            ImportedEventLog import() => csvImporter.LoadLog(path);

            // Assert
            Assert.Throws<CannotParseFileException>(import);
        }

        [Fact]
        public void Import_EmptyFileWithoutHeaders_ReturnEmptyLog()
        {
            CsvImporter csvImporter = new()
            {
                HasHeaders = false
            };

            // Act
            var path = Path.Combine(filesPath, "empty.csv");
            ImportedEventLog import() => csvImporter.LoadLog(path);

            // Assert
            Assert.Throws<CannotParseFileException>(import);
        }
    }
}