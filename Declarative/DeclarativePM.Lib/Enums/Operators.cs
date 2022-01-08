namespace DeclarativePM.Lib.Enums
{
    /// <summary>
    ///     (Linear temporal) Logic operators.
    ///     None serves when there is no operator, only an atomic expression
    ///     Operators from range 1 - 31 are unary operators
    ///     Operators from range > 31 are binary operators
    ///     Other are reserved in case new operator is needed
    /// </summary>
    public enum Operators
    {
        None = 0,

        //unary
        Not = 1,
        Next = 2,
        Subsequent = 3,
        Eventual = 4,

        //binary
        And = 32,
        Or = 33,
        Imply = 34,
        Equivalence = 35,
        Least = 36
    }
}