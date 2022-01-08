using System;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;

namespace DeclarativePM.Lib.Declare_Templates.Factories
{
    public static class BiTemplateFactory
    {
        public static BiTemplate GetInstance(TemplateInstanceType type, string evnt1, string evnt2)
        {
            return type switch
            {
                TemplateInstanceType.AlternatePrecedence => new AlternatePrecedence(evnt1, evnt2),
                TemplateInstanceType.AlternateResponse => new AlternateResponse(evnt1, evnt2),
                TemplateInstanceType.AlternateSuccession => new AlternateSuccession(evnt1, evnt2),
                TemplateInstanceType.ChainPrecedence => new ChainPrecedence(evnt1, evnt2),
                TemplateInstanceType.ChainResponse => new ChainResponse(evnt1, evnt2),
                TemplateInstanceType.ChainSuccession => new ChainSuccession(evnt1, evnt2),
                TemplateInstanceType.Coexistence => new Coexistence(evnt1, evnt2),
                TemplateInstanceType.NotChainSuccession => new NotChainSuccession(evnt1, evnt2),
                TemplateInstanceType.NotCoexistence => new NotCoexistence(evnt1, evnt2),
                TemplateInstanceType.NotSuccession => new NotSuccession(evnt1, evnt2),
                TemplateInstanceType.Precedence => new Precedence(evnt1, evnt2),
                TemplateInstanceType.RespondedExistence => new RespondedExistence(evnt1, evnt2),
                TemplateInstanceType.Response => new Response(evnt1, evnt2),
                TemplateInstanceType.Succession => new Succession(evnt1, evnt2),
                _ => throw new ArgumentOutOfRangeException(nameof(type), type, null)
            };
        }
    }
}