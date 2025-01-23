
using System.Text;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.ConformanceModels;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Utils;

namespace API.Utils
{
    public static class Utilities
    {
        public static List<string> CommonTimestampFormats = new()
        {
            // ISO 8601 and RFC formats
            "yyyy-MM-dd HH:mm:ss",
            "yyyy/MM/dd HH:mm:ss",
            "yyyy-MM-ddTHH:mm:ss",
            "yyyy-MM-ddTHH:mm:ss.fffZ", // ISO 8601 with milliseconds and UTC marker
            "yyyyMMddHHmmss",          // Compact format
            "yyyy-MM-ddTHH:mm:ssK",    // ISO 8601 with timezone information
            "O",                       // Round-trip (e.g., "2023-11-25T15:47:02.3456789Z")
            "R",                       // RFC 1123 (e.g., "Sat, 25 Nov 2023 15:47:02 GMT")
            "u",                       // Universal sortable format (e.g., "2023-11-25 15:47:02Z")

            // Common date and time combinations
            "dd-MM-yyyy HH:mm:ss",
            "dd/MM/yyyy HH:mm:ss",
            "MM/dd/yyyy HH:mm:ss",
            "MM/dd/yyyy HH:mm",
            "dddd, dd MMMM yyyy HH:mm:ss", // Verbose full day and date format
            "yyyy-MM-dd HH:mm:ss.fff",     // Includes milliseconds
            "yyyy-MM-dd HH:mm:ss.ffff",    // Includes microseconds
            "yyyy-MM-dd HH:mm:ss.fffffff", // Includes ticks

            // Common date-only formats
            "yyyy-MM-dd",    // Standard date
            "yyyy/MM/dd",    // Alternative delimiter
            "dd-MM-yyyy",    // European style
            "MM/dd/yyyy",    // US style
            "dddd, dd MMMM yyyy", // Full day and date
            "MMMM dd, yyyy", // Month name with day and year
            "dd MMM yyyy",   // Day, short month name, and year

            // Common time-only formats
            "HH:mm:ss",      // Hours, minutes, and seconds
            "HH:mm:ss.fff",  // Includes milliseconds
            "hh:mm tt",      // 12-hour clock with AM/PM
            "hh:mm:ss tt",   // 12-hour clock with seconds and AM/PM
            "HH:mm",         // Hours and minutes (24-hour clock)
            "hh:mm tt zzz",  // 12-hour clock with timezone

            // Variations with timezone information
            "yyyy-MM-ddTHH:mm:sszzz",     // ISO 8601 with timezone offset
            "yyyy-MM-dd HH:mm:ss zzz",    // Full date and time with offset
            "yyyyMMddTHHmmssZ",           // Compact ISO 8601 with Zulu (UTC)
            "yyyy-MM-dd'T'HH:mm:ssZ",     // ISO 8601 UTC
            "yyyy-MM-dd'T'HH:mm:ss.fffK", // ISO 8601 with optional timezone offset

            // Custom culture-specific formats
            "M/d/yyyy",          // Short date (e.g., 11/25/2023)
            "dd MMM yyyy",       // Day, month name, year (e.g., 25 Nov 2023)
            "MMM dd, yyyy",      // Month name, day, year (e.g., Nov 25, 2023)
            "d MMMM yyyy",       // Day, full month name, year (e.g., 25 November 2023)
            "MMMM yyyy",         // Month name and year (e.g., November 2023)
            "yyyy MMMM",         // Year and month name (e.g., 2023 November)

            // Unix timestamps and compact formats
            "yyyyMMdd",          // Compact date format
            "HHmmss",            // Compact time format
            "yyyyMMddTHHmmss",   // Compact ISO 8601
            "yyyyMMddHHmmssfff", // Compact format with milliseconds

            // Day.Month.Year formats
            "dd.MM.yyyy",           // Day.Month.Year (e.g., 25.11.2023)
            "d.M.yyyy",             // Single-digit day and month if applicable (e.g., 5.6.2023)
            "dd.MM.yyyy HH:mm:ss",  // Day.Month.Year with time (e.g., 25.11.2023 15:47:02)
            "dd.MM.yyyy HH:mm",     // Day.Month.Year with hours and minutes (e.g., 25.11.2023 15:47)
            "dd.MM.yyyy HH:mm:ss.fff", // Day.Month.Year with milliseconds (e.g., 25.11.2023 15:47:02.123)

            // Variations with separators
            "dd.MM.yyyy'T'HH:mm:ss",    // Day.Month.Year with 'T' separator for time
            "dd.MM.yyyy HH:mm:ss zzz",  // Day.Month.Year with time and timezone offset
            "dd.MM.yyyy HH:mm:ssK",     // Day.Month.Year with time and timezone information

            // Day.Month.Year with month names
            "d MMMM yyyy",              // Day FullMonthName Year (e.g., 25 November 2023)
            "dd.MM.yyyy ddd",           // Day.Month.Year with abbreviated day name (e.g., 25.11.2023 Sat)
            "dd.MM.yyyy dddd",          // Day.Month.Year with full day name (e.g., 25.11.2023 Saturday)
            "d MMM yyyy",               // Day AbbreviatedMonthName Year (e.g., 25 Nov 2023)

            // Compact formats for Day.Month.Year
            "d.M.yy",                   // Compact Day.Month.Year with two-digit year (e.g., 5.6.23)
            "dd.MM.yy",                 // Two-digit day and year (e.g., 25.11.23)

            // Day.Month.Year with timezones
            "dd.MM.yyyy HH:mm:ss 'UTC'", // Day.Month.Year with explicit UTC label
            "dd.MM.yyyy HH:mm:ss 'GMT'", // Day.Month.Year with explicit GMT label
            "dd.MM.yyyy HH:mm:ss 'Z'",   // Day.Month.Year with Zulu time (UTC)

            // Custom formats for filenames or identifiers
            "yyyy.MM.dd",               // Year.Month.Day (e.g., 2023.11.25)
            "yyyy.MM.dd_HH-mm-ss",      // Year.Month.Day with time (e.g., 2023.11.25_15-47-02)
            "dd.MM.yyyy_HH-mm",         // Day.Month.Year with hours and minutes (e.g., 25.11.2023_15-47)
            "yyyyMMddTHHmmssZ",         // ISO 8601 compact with Zulu time
        };

        private static string _generateEdge(string activity1, string activity2, string label, string color, string arrowhead)
        {
            return $"\t\"{activity1}\" -> \"{activity2}\" [label=<<font color=\"{color}\"><b>{label}</b></font>>, color=\"{color}\", arrowhead=\"{arrowhead}\"]\n";
        }
        private static readonly Dictionary<TemplateInstanceType, string> _colorMap = new()
        {
            { TemplateInstanceType.None, "#000000" },               // Black
            { TemplateInstanceType.Absence, "#D32F2F" },            // Dark Red
            { TemplateInstanceType.AlternatePrecedence, "#388E3C" },// Dark Green
            { TemplateInstanceType.AlternateResponse, "#1976D2" },  // Medium Blue
            { TemplateInstanceType.AlternateSuccession, "#F57C00" },// Dark Orange
            { TemplateInstanceType.ChainPrecedence, "#7B1FA2" },    // Dark Magenta
            { TemplateInstanceType.ChainResponse, "#0097A7" },      // Dark Cyan
            { TemplateInstanceType.ChainSuccession, "#6A1B9A" },    // Dark Purple
            { TemplateInstanceType.Coexistence, "#E65100" },        // Deep Orange
            { TemplateInstanceType.Exactly, "#2E7D32" },            // Dark Green
            { TemplateInstanceType.Existence, "#424242" },          // Dark Gray
            { TemplateInstanceType.Init, "#C2185B" },               // Dark Pink
            { TemplateInstanceType.NotChainSuccession, "#5D4037" }, // Dark Brown
            { TemplateInstanceType.NotCoexistence, "#FF8F00" },     // Dark Gold/Amber
            { TemplateInstanceType.NotSuccession, "#C62828" },      // Deep Red
            { TemplateInstanceType.Precedence, "#1565C0" },         // Deep Blue
            { TemplateInstanceType.RespondedExistence, "#8E24AA" }, // Deep Orchid
            { TemplateInstanceType.Response, "#283593" },           // Dark Indigo
            { TemplateInstanceType.Succession, "#00838F" }          // Deep Turquoise
        };

        // Absence
        // Existence
        // Exactly
        private static string GenerateExistenceTemplateEdges(List<ExistenceTemplate> existenceTemplates, string color)
        {
            var sb = new StringBuilder();

            var existanceTemplates = new Dictionary<string, ExistenceTemplate>();

            foreach (var tit in existenceTemplates)
            {
                var activity = tit.GetEvent();
                var occurences = tit.GetCount();

                if (!existanceTemplates.ContainsKey(activity))
                {
                    existanceTemplates.Add(activity, tit);
                    continue;
                }

                if (occurences > existanceTemplates[activity].GetCount())
                {
                    existanceTemplates[activity] = tit;
                }
            }

            foreach (var (activity, tit) in existanceTemplates)
            {
                sb.Append(_generateEdge(activity, activity, tit.ToString(), color, "none"));
            }

            return sb.ToString(); ;
        }

        // AlternatePrecedence
        // AlternateResponse
        // AlternateSuccession
        // ChainPrecedence
        // ChainResponse
        // ChainSuccession
        // Coexistence
        // NotChainSuccession
        // NotCoexistence
        // NotSuccession
        // Precedence
        // RespondedExistence
        // Response
        // Succession
        private static string GenerateBiTemplateEdges(List<BiTemplate> biTemplates, string color)
        {
            var sb = new StringBuilder();

            foreach (var tit in biTemplates)
            {
                sb.Append(_generateEdge(tit.GetEventA(), tit.GetEventB(), tit.ToString(), color, "normal"));
            }

            return sb.ToString();
        }

        // Init
        private static string GenerateUniTemplateEdges(List<UniTemplate> uniTemplates, string color)
        {
            var sb = new StringBuilder();

            foreach (var tit in uniTemplates)
            {
                sb.Append(_generateEdge(tit.GetEventA(), tit.GetEventA(), tit.ToString(), color, "none"));
            }

            return sb.ToString();
        }

        public static string CreateDotGraph(List<ParametrizedTemplate> templates)
        {
            var sb = new StringBuilder();

            sb.Append("digraph G {\n");
            sb.Append("\tnode [shape=\"box\", color=\"black\", style=\"rounded,filled\", fillcolor=\"lightgray\", fontcolor=\"black\", fontsize=12, penwidth=2, width=0.7, height=0.7];\n\n");

            foreach (var template in templates)
            {
                var color = _colorMap[template.TemplateDescription.TemplateType];
                switch (template.TemplateDescription.TemplateParametersType)
                {
                    case TemplateTypes.Existence:
                        {
                            sb.Append(GenerateExistenceTemplateEdges(template.TemplateInstances.Cast<ExistenceTemplate>().ToList(), color));
                            break;
                        }
                    case TemplateTypes.BiTemplate:
                        {
                            sb.Append(GenerateBiTemplateEdges(template.TemplateInstances.Cast<BiTemplate>().ToList(), color));
                            break;
                        }
                    case TemplateTypes.UniTemplate:
                        {
                            sb.Append(GenerateUniTemplateEdges(template.TemplateInstances.Cast<UniTemplate>().ToList(), color));
                            break;
                        }
                    default: break;
                }
            }

            sb.Append("}\n");

            return sb.ToString();
        }

        public static string GetExpansionBackground<T>(T current, T selected)
        {
            return current.Equals(selected) ? "background: #ffd5ff" : "background: #f3f3f3";
        }

        public static string GetExpansionBackground<T>(T current, List<T> from)
        {
            return from.Contains(current) ? "background: #ffd5ff" : "background: #f3f3f3";
        }

        public static string GetTreeBackground(string current, List<TemplateEvaluation> evaluations)
        {
            if (evaluations is null)
                return "background: #ffffff";
            if (evaluations.Any(x => x.ConstraintEvaluations
                .Where(c => c is not null)
                .Any(y => y.Constraint.ToString()
                    .Equals(current) && Math.Abs(x.Healthiness.FulfillmentRation - 1) > 0.01)))
                return "background: #ffd5ff";
            return "background: #ffffff";
        }
    }
}
public class ActivitiesComparer : IEqualityComparer<IList<string>>
{
    public bool Equals(IList<string> x, IList<string> y)
    {
        if (x == null || y == null) return false;
        return x.SequenceEqual(y);
    }

    public int GetHashCode(IList<string> arr)
    {
        int hash = 19;
        foreach (var s in arr)
        {
            hash += s.GetHashCode();
        }
        return hash;
    }
}