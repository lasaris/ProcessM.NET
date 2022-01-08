namespace DeclarativePM.Lib.Enums
{
    /// <summary>
    ///     Template types
    ///     None for undefined
    ///     Operators from range 1 - 14 are based on amount of events they relate to
    ///     Operators from range > 15 are custom types such es existence
    ///     which takes second parameter an integer as number of occurrences
    /// </summary>
    public enum TemplateTypes
    {
        None = 0,

        UniTemplate = 1,
        BiTemplate = 2,

        Existence = 15
    }
}