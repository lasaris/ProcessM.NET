using System;
using System.Collections.Generic;
using System.Linq;
using DeclarativePM.Lib.Declare_Templates;
using DeclarativePM.Lib.Declare_Templates.TemplateInterfaces;
using DeclarativePM.Lib.Models.LogModels;

namespace DeclarativePM.Lib.Utils
{
    public static class UtilMethods
    {
        /// <summary>
        ///     Generates all the possible combinations of elements in the bag.
        /// </summary>
        /// <param name="rest">How many elements do we combine into one combination.</param>
        /// <param name="bag">All the possible elements.</param>
        /// <param name="repeat">Whether generate combinations with repeat or not.</param>
        /// <typeparam name="T">Type of element for which we generate combinations.</typeparam>
        /// <returns>List containing all the combinations of elements of type T stored in List.</returns>
        public static List<List<T>> Combinations<T>(int rest, T[] bag, bool repeat)
        {
            var res = new List<List<T>>();
            List<List<T>> recursive = null;

            if (rest != 1)
                recursive = Combinations(rest - 1, bag, repeat);

            foreach (var t in bag)
            {
                if (rest == 1)
                {
                    res.Add(new List<T> {t});
                    continue;
                }

                if (!repeat)
                {
                    res.AddRange(recursive?.Where(c => !c.Contains(t)).Select(c => new List<T>(c) {t}) ??
                                 new List<List<T>>());
                    continue;
                }

                res.AddRange(recursive?
                    .Select(c => new List<T>(c) {t}) ?? new List<List<T>>());
            }

            return res;
        }

        /// <summary>
        /// </summary>
        /// <param name="p"></param>
        /// <param name="min"></param>
        /// <param name="max"></param>
        /// <returns></returns>
        public static decimal CutIntoRange(decimal p, decimal min = 0, decimal max = 100)
        {
            p = p > max ? max : p;
            p = p < min ? min : p;
            return p;
        }

        public static List<Event> PreprocessTraceForEvaluation(ITemplate template, List<Event> events)
        {
            Event addition;
            var front = false;
            switch (template)
            {
                case AlternatePrecedence ap:
                    addition = new Event(ap.LogEventA + ap.LogEventB, events.FirstOrDefault()?.CaseId ?? "0");
                    break;
                case AlternateSuccession asu:
                    addition = new Event(asu.LogEventA + asu.LogEventB, events.FirstOrDefault()?.CaseId ?? "0");
                    break;
                case ChainPrecedence cp:
                    addition = new Event(cp.LogEventA + cp.LogEventB, events.FirstOrDefault()?.CaseId ?? "0");
                    front = true;
                    break;
                case ChainSuccession cs:
                    addition = new Event(cs.LogEventA + cs.LogEventB, events.FirstOrDefault()?.CaseId ?? "0");
                    front = true;
                    break;
                default:
                    return events;
            }

            var extended = events.ToList();
            if (front)
                extended.Insert(0, addition);
            else
                extended.Add(addition);

            return extended;
        }

        public static List<List<string>> RemoveReversedDuplicates(List<List<string>> combos)
        {
            if (combos.Any(x => x.Count != 2))
                throw new Exception("All sub lists have to have same length.");
            var ordered = combos
                .Select(lst => lst
                    .OrderBy(s => s).ToList())
                .OrderBy(lst => lst[0])
                .ThenBy(lst => lst[1])
                .ToList();

            List<List<string>> result = new();
            for (var i = 0; i < ordered.Count; i += 2)
            {
                result.Add(ordered[i]);
                if (ordered[i][0] == ordered[i + 1][0] || ordered[i][1] == ordered[i + 1][1]) continue;
                ordered[i + 1].Reverse();
                result.Add(ordered[i + 1]);
            }

            if (ordered.Count % 2 == 1)
                result.Add(ordered.Last());

            return result;
        }
    }
}