using System;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;

namespace DeclarativePM.Lib.Declare_Templates.Factories
{
    public static class UniTemplateFactory
    {
        public static UniTemplate GetInstance(TemplateInstanceType type, string evnt)
        {
            return type switch
            {
                TemplateInstanceType.Init => new Init(evnt),
                _ => throw new ArgumentOutOfRangeException(nameof(type), type, null)
            };
        }
    }
}