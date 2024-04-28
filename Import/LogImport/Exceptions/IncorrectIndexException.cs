namespace LogImport.Exceptions;

/// <summary>
///  Exception thrown when an incorrect index is used.
/// </summary>
class IncorrectIndexException : Exception
{
    public IncorrectIndexException() : base()
    {
    }

    public IncorrectIndexException(string message) : base(message)
    {
    }
}