using System;
using System.Collections.Generic;
using DeclarativePM.Lib.Declare_Templates.TemplateInterfaces;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DeclarativePM.Lib.IO
{
    /// <summary>
    ///     Specifies how to convert Parametrized templates
    /// </summary>
    public class ParametrizedTemplateConverter : JsonConverter<ParametrizedTemplate>
    {
        public override void WriteJson(JsonWriter writer, ParametrizedTemplate value, JsonSerializer serializer)
        {
            var t = JToken.FromObject(value);

            if (t.Type != JTokenType.Object)
            {
                t.WriteTo(writer);
                return;
            }

            var o = (JObject) t;
            var type = value.TemplateDescription.TemplateType;
            var instances = JsonConvert.SerializeObject(value.TemplateInstances,
                new TemplateConverter(value.OptionalConstraints));
            var jo = JToken.Parse(instances);


            o.AddFirst(new JProperty("TemplateType", type));
            o.Add(new JProperty("TemplateInstances", jo));

            o.WriteTo(writer);
        }

        public override ParametrizedTemplate ReadJson(JsonReader reader, Type objectType,
            ParametrizedTemplate existingValue,
            bool hasExistingValue, JsonSerializer serializer)
        {
            var jo = JObject.Load(reader);
            var type = (TemplateInstanceType) (jo["TemplateType"] ?? 0).Value<int>();
            var constraints = new List<ITemplate>();
            var optionals = new List<ITemplate>();
            var opt = jo["TemplateInstances"]?.Children();
            foreach (var token in opt)
            {
                var to = (JObject) token;
                var template = JsonConvert.DeserializeObject<ITemplate>(token.ToString(),
                    new TemplateConverter(type));
                if (template is null)
                    continue;
                constraints.Add(template);
                if ((to["Optional"] ?? false).Value<bool>())
                    optionals.Add(template);
            }

            jo.Remove("TemplateInstances");
            var pt = jo.ToObject<ParametrizedTemplate>();
            if (pt is not null)
            {
                pt.TemplateInstances = constraints;
                pt.OptionalConstraints = optionals;
            }

            return pt;
        }
    }
}