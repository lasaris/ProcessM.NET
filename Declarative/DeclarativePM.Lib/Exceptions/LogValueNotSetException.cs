using System;

namespace DeclarativePM.Lib.Exceptions
{
    /// <summary>
    ///     Exception when try to get header which does not exist
    /// </summary>
    public class LogValueNotSetException : Exception
    {
        public LogValueNotSetException()
        {
        }

        public LogValueNotSetException(string message)
            : base(message)
        {
        }

        public LogValueNotSetException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}