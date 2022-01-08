using System;
using DeclarativePM.Lib.Declare_Templates;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;

namespace DeclarativePM.Lib.Utils
{
    public static class ExtensionMethods
    {
        /// <summary>
        ///     Assigns template type if Type is assignable to its corresponding class.
        /// </summary>
        /// <param name="type"></param>
        /// <returns>Concrete template type</returns>
        public static TemplateInstanceType GetPossibleTemplateType(this Type type)
        {
            if (type.IsAssignableTo(typeof(Absence)))
                return TemplateInstanceType.Absence;
            if (type.IsAssignableTo(typeof(AlternatePrecedence)))
                return TemplateInstanceType.AlternatePrecedence;
            if (type.IsAssignableTo(typeof(AlternateResponse)))
                return TemplateInstanceType.AlternateResponse;
            if (type.IsAssignableTo(typeof(AlternateSuccession)))
                return TemplateInstanceType.AlternateSuccession;
            if (type.IsAssignableTo(typeof(ChainPrecedence)))
                return TemplateInstanceType.ChainPrecedence;
            if (type.IsAssignableTo(typeof(ChainResponse)))
                return TemplateInstanceType.ChainResponse;
            if (type.IsAssignableTo(typeof(ChainSuccession)))
                return TemplateInstanceType.ChainSuccession;
            if (type.IsAssignableTo(typeof(Coexistence)))
                return TemplateInstanceType.Coexistence;
            if (type.IsAssignableTo(typeof(Exactly)))
                return TemplateInstanceType.Exactly;
            if (type.IsAssignableTo(typeof(Existence)))
                return TemplateInstanceType.Existence;
            if (type.IsAssignableTo(typeof(Init)))
                return TemplateInstanceType.Init;
            if (type.IsAssignableTo(typeof(NotChainSuccession)))
                return TemplateInstanceType.NotChainSuccession;
            if (type.IsAssignableTo(typeof(NotCoexistence)))
                return TemplateInstanceType.NotCoexistence;
            if (type.IsAssignableTo(typeof(NotSuccession)))
                return TemplateInstanceType.NotSuccession;
            if (type.IsAssignableTo(typeof(Precedence)))
                return TemplateInstanceType.Precedence;
            if (type.IsAssignableTo(typeof(RespondedExistence)))
                return TemplateInstanceType.RespondedExistence;
            if (type.IsAssignableTo(typeof(Response)))
                return TemplateInstanceType.Response;
            if (type.IsAssignableTo(typeof(Succession)))
                return TemplateInstanceType.Succession;
            return TemplateInstanceType.None;
        }

        /// <summary>
        /// </summary>
        /// <param name="template"></param>
        /// <returns>Template type of specific instance type</returns>
        public static TemplateTypes GetTemplateType(this TemplateInstanceType template)
        {
            switch (template)
            {
                case TemplateInstanceType.Init:
                    return TemplateTypes.UniTemplate;
                case TemplateInstanceType.Exactly:
                case TemplateInstanceType.Existence:
                case TemplateInstanceType.Absence:
                    return TemplateTypes.Existence;
                case TemplateInstanceType.AlternatePrecedence:
                case TemplateInstanceType.AlternateResponse:
                case TemplateInstanceType.AlternateSuccession:
                case TemplateInstanceType.ChainPrecedence:
                case TemplateInstanceType.ChainResponse:
                case TemplateInstanceType.ChainSuccession:
                case TemplateInstanceType.Coexistence:
                case TemplateInstanceType.NotChainSuccession:
                case TemplateInstanceType.NotCoexistence:
                case TemplateInstanceType.NotSuccession:
                case TemplateInstanceType.Precedence:
                case TemplateInstanceType.RespondedExistence:
                case TemplateInstanceType.Response:
                case TemplateInstanceType.Succession:
                    return TemplateTypes.BiTemplate;
                default:
                    return TemplateTypes.None;
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="template"></param>
        /// <returns>Return category into which template belongs.</returns>
        /// <exception cref="Exception"></exception>
        public static TemplateBookType GetTemplateBookType(this TemplateInstanceType template)
        {
            switch (template)
            {
                case TemplateInstanceType.Init:
                case TemplateInstanceType.Exactly:
                case TemplateInstanceType.Existence:
                case TemplateInstanceType.Absence:
                    return TemplateBookType.Existential;
                case TemplateInstanceType.AlternatePrecedence:
                case TemplateInstanceType.AlternateResponse:
                case TemplateInstanceType.AlternateSuccession:
                case TemplateInstanceType.ChainPrecedence:
                case TemplateInstanceType.ChainResponse:
                case TemplateInstanceType.ChainSuccession:
                case TemplateInstanceType.Coexistence:
                case TemplateInstanceType.Precedence:
                case TemplateInstanceType.RespondedExistence:
                case TemplateInstanceType.Response:
                case TemplateInstanceType.Succession:
                    return TemplateBookType.Relational;
                case TemplateInstanceType.NotChainSuccession:
                case TemplateInstanceType.NotCoexistence:
                case TemplateInstanceType.NotSuccession:
                    return TemplateBookType.NotRelational;
                default:
                    throw new Exception("Wrong enum type");
            }
        }

        /// <summary>
        ///     Returns amount of events a single template concerns
        /// </summary>
        /// <param name="type"></param>
        /// <returns>Number of events template takes</returns>
        /// <exception cref="ArgumentOutOfRangeException"></exception>
        public static int GetTemplateEventArgs(this TemplateTypes type)
        {
            switch (type)
            {
                case TemplateTypes.UniTemplate:
                case TemplateTypes.Existence:
                    return 1;
                case TemplateTypes.BiTemplate:
                    return 2;
                default:
                    throw new ArgumentOutOfRangeException(nameof(type), type, null);
            }
        }

        /// <summary>
        ///     Returns detailed template description based on on template instance type.
        /// </summary>
        /// <param name="template">Template type</param>
        /// <returns>Template description</returns>
        /// <exception cref="Exception">When enum out of defined range is passed</exception>
        public static TemplateDescription GetTemplateDescription(this TemplateInstanceType template)
        {
            switch (template)
            {
                case TemplateInstanceType.Init:
                    return new TemplateDescription(
                        "Init(A, B)",
                        "Existential",
                        "A is the first to occur",
                        "A",
                        "A",
                        template);
                case TemplateInstanceType.Exactly:
                    return new TemplateDescription(
                        "Exactly(n, A)",
                        "Existential",
                        "A occurs exactly n times",
                        "existence(n, A) && absence(n + 1, A)",
                        "A",
                        template);
                case TemplateInstanceType.Existence:
                    return new TemplateDescription(
                        "Existence(n, B)",
                        "Existential",
                        "A occurs at least n times",
                        "◇(A && ◯(Existence(n-1, A)))\n◇(A)",
                        "A",
                        template);
                case TemplateInstanceType.Absence:
                    return new TemplateDescription(
                        "Absence(n, B)",
                        "Relational",
                        "A occurs at most n - 1 times",
                        "!existence(n, A)",
                        "A",
                        template);
                case TemplateInstanceType.RespondedExistence:
                    return new TemplateDescription(
                        "Responded Existence(A, B)",
                        "Relational",
                        "A is the first to occur",
                        "A",
                        "A",
                        template);
                case TemplateInstanceType.Precedence:
                    return new TemplateDescription(
                        "Precedence(A, B)",
                        "Relational",
                        "B occurs only if preceded by A",
                        "(!B U A) || subsequent(!B)",
                        "B",
                        template);
                case TemplateInstanceType.Response:
                    return new TemplateDescription(
                        "Response(A, B)",
                        "Relational",
                        "If A occurs, then B occurs after A",
                        "subsequent(A => eventual(B))",
                        "A",
                        template);
                case TemplateInstanceType.Succession:
                    return new TemplateDescription(
                        "Succession(A, B)",
                        "Relational",
                        "A occurs if and only if B occurs after A",
                        "response(A, B) && precedence(A, B)",
                        "A, B",
                        template);
                case TemplateInstanceType.AlternatePrecedence:
                    return new TemplateDescription(
                        "Alternate Precedence(A, B)",
                        "Relational",
                        "Each time B occurs, it is preceded by A and no other B can recur in between",
                        "precedence(A, B) && subsequent(B => next(precedence(A, B)))",
                        "B",
                        template);
                case TemplateInstanceType.AlternateResponse:
                    return new TemplateDescription(
                        "Alternate Response(A, B)",
                        "Relational",
                        "Each time A occurs, then B occurs afterwards, before A recurs",
                        "subsequent(A => next(!A U B))",
                        "A",
                        template);
                case TemplateInstanceType.AlternateSuccession:
                    return new TemplateDescription(
                        "Alternate Succession(A, B)",
                        "Relational",
                        "A and B occur if and only if the latter follows the former, and they alternate each other",
                        "AlternateResponse(A, B) && AlternatePrecedence(A, B)",
                        "A, B",
                        template);
                case TemplateInstanceType.ChainPrecedence:
                    return new TemplateDescription(
                        "Chain Precedence(A, B)",
                        "Relational",
                        "Each time B occurs, then A occurs immediately before",
                        "subsequent(next(B) => A)",
                        "B",
                        template);
                case TemplateInstanceType.ChainResponse:
                    return new TemplateDescription(
                        "Chain Response(A, B)",
                        "Relational",
                        "Each time A occurs, then B occurs immediately after ",
                        "subsequent(A => next(B))",
                        "A",
                        template);
                case TemplateInstanceType.ChainSuccession:
                    return new TemplateDescription(
                        "Chain Succession(A, B)",
                        "Relational",
                        "A and B occur if and only if the latter immediately follows the former",
                        "subsequent(A <=> next(B))",
                        "A, B",
                        template);
                case TemplateInstanceType.Coexistence:
                    return new TemplateDescription(
                        "Coexistence(A, B)",
                        "Relational",
                        "If B occurs, then A occurs, and vice versa",
                        "eventual(A) <=> eventual(B)",
                        "A, B",
                        template);
                case TemplateInstanceType.NotChainSuccession:
                    return new TemplateDescription(
                        "Not Chain Succession(A, B)",
                        "Not Relational",
                        "A and B occur if and only if the latter does not immediately follow the former ",
                        "subsequent(A => next(!B))",
                        "A, B",
                        template);
                case TemplateInstanceType.NotCoexistence:
                    return new TemplateDescription(
                        "Not Coexistence(A, B)",
                        "Not Relational",
                        "A and B never occur together ",
                        "!(eventual(A) && eventual(B))",
                        "A, B",
                        template);
                case TemplateInstanceType.NotSuccession:
                    return new TemplateDescription(
                        "Not Succession(A, B)",
                        "Not Relational",
                        "A never occurs before B ",
                        "subsequent(A => !eventual(B))",
                        "A, B",
                        template);
                default:
                    throw new Exception("Wrong enum type");
            }
        }
    }
}