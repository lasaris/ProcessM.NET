using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Models.ConformanceModels
{
    /// <summary>
    ///     Represents single event with its activation type
    /// </summary>
    public record WrappedEventActivation
    {
        public WrappedEventActivation(Event @event, EventActivationType activation)
        {
            Event = @event;
            Activation = activation;
        }

        public EventActivationType Activation { get; }
        public Event Event { get; }
    }
}