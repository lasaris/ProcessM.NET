namespace DeclarativePM.Lib.Enums
{
    /// <summary>
    ///     Type of an activity, when it's not an activation - None. Remaining otherwise correspondingly.
    /// </summary>
    public enum EventActivationType
    {
        None,
        Fulfilment,
        Conflict,
        Violation
    }
}