using System;
using System.Collections.Generic;
using DeclarativePM.Lib.Declare_Templates;
using DeclarativePM.Lib.Declare_Templates.TemplateInterfaces;
using DeclarativePM.Lib.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DeclarativePM.Lib.IO
{
    /// <summary>
    ///     Specifies how to convert ITemplate - constraints
    /// </summary>
    public class TemplateConverter : JsonConverter<ITemplate>
    {
        private readonly List<ITemplate> _optionals;
        private readonly TemplateInstanceType _type = TemplateInstanceType.None;

        public TemplateConverter(TemplateInstanceType type)
        {
            _type = type;
        }

        public TemplateConverter(List<ITemplate> optionals)
        {
            _optionals = optionals;
        }

        public override void WriteJson(JsonWriter writer, ITemplate value, JsonSerializer serializer)
        {
            var t = JObject.FromObject(value);

            if (t.Type != JTokenType.Object)
            {
                t.WriteTo(writer);
                return;
            }

            var jo = (JObject) t;
            jo.Add(new JProperty("Optional", _optionals.Contains(value)));


            jo.WriteTo(writer);
        }

        public override ITemplate ReadJson(JsonReader reader, Type objectType, ITemplate existingValue,
            bool hasExistingValue,
            JsonSerializer serializer)
        {
            var jo = JObject.Load(reader);
            return _type switch
            {
                TemplateInstanceType.Absence => jo.ToObject<Absence>(),
                TemplateInstanceType.AlternatePrecedence => jo.ToObject<AlternatePrecedence>(),
                TemplateInstanceType.AlternateResponse => jo.ToObject<AlternateResponse>(),
                TemplateInstanceType.AlternateSuccession => jo.ToObject<AlternateSuccession>(),
                TemplateInstanceType.ChainPrecedence => jo.ToObject<ChainPrecedence>(),
                TemplateInstanceType.ChainResponse => jo.ToObject<ChainResponse>(),
                TemplateInstanceType.ChainSuccession => jo.ToObject<ChainSuccession>(),
                TemplateInstanceType.Coexistence => jo.ToObject<Coexistence>(),
                TemplateInstanceType.Exactly => jo.ToObject<Exactly>(),
                TemplateInstanceType.Existence => jo.ToObject<Existence>(),
                TemplateInstanceType.Init => jo.ToObject<Init>(),
                TemplateInstanceType.NotChainSuccession => jo.ToObject<NotChainSuccession>(),
                TemplateInstanceType.NotCoexistence => jo.ToObject<NotCoexistence>(),
                TemplateInstanceType.NotSuccession => jo.ToObject<NotSuccession>(),
                TemplateInstanceType.Precedence => jo.ToObject<Precedence>(),
                TemplateInstanceType.RespondedExistence => jo.ToObject<RespondedExistence>(),
                TemplateInstanceType.Response => jo.ToObject<Response>(),
                TemplateInstanceType.Succession => jo.ToObject<Succession>(),
                _ => null
            };
        }
    }
}