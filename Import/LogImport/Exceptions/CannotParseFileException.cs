namespace LogImport.Exceptions
{
    /// <summary>
    ///   Exception thrown when a file cannot be parsed.
    /// </summary>
    public class CannotParseFileException : Exception
    {
        public CannotParseFileException() : base() { }

        public CannotParseFileException(string message) : base(message) { }
    }
}