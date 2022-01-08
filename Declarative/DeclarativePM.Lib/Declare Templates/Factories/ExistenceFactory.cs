using System;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;

namespace DeclarativePM.Lib.Declare_Templates.Factories
{
    public static class ExistenceFactory
    {
        public static ExistenceTemplate GetInstance(TemplateInstanceType type, int amount, string evnt)
        {
            return type switch
            {
                TemplateInstanceType.Absence => new Absence(amount, evnt),
                TemplateInstanceType.Exactly => new Exactly(amount, evnt),
                TemplateInstanceType.Existence => new Existence(amount, evnt),
                _ => throw new ArgumentOutOfRangeException(nameof(type), type, null)
            };
        }
    }
}