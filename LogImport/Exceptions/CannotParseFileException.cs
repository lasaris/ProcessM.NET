namespace LogImport.Exceptions
{
    public class CannotParseFileException : Exception
    {
        public CannotParseFileException() { }

        public CannotParseFileException(string message) : base(message) { }
    }
}