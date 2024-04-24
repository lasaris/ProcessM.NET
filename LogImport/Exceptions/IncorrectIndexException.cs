namespace LogImport.Exceptions;

class IncorrectIndexException : Exception
{
    public IncorrectIndexException() : base()
    {
    }

    public IncorrectIndexException(string message) : base(message)
    {
    }
}