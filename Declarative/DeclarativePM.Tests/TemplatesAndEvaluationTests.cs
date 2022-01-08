using System;
using System.Collections.Generic;
using DeclarativePM.Lib.Declare_Templates;
using DeclarativePM.Lib.Declare_Templates.AbstractClasses;
using DeclarativePM.Lib.Enums;
using DeclarativePM.Lib.Models.DeclareModels;
using DeclarativePM.Lib.Models.LogModels;
using DeclarativePM.Lib.Utils;
using Xunit;

namespace DeclarativePM.Tests
{
    public class TemplatesAndEvaluationTests
    {
        private readonly ConstraintEvaluator _constraintEvaluator = new();

        private readonly List<Event> _eventsANotOccurs = new()
        {
            new Event("c", "1"),
            new Event("b", "1")
        };

        private readonly List<Event> _eventsBNotOccurs = new()
        {
            new Event("a", "1"),
            new Event("c", "1"),
            new Event("c", "1")
        };

        private readonly List<Event> _eventsNotActivated = new()
        {
            new Event("c", "1"),
            new Event("c", "1"),
            new Event("c", "1")
        };

        /// <summary>
        ///     Checks whether vacuity detection
        /// </summary>
        /// <param name="template"></param>
        /// <param name="activation">0 - both A and B are activators, 1 - A activates, 2 - B activates</param>
        private void CheckVacuity(BiTemplate template, short activation)
        {
            if (0 > activation || activation > 2)
                throw new ArgumentException("Only values from 0 to 2 are allowed as activation");

            if (activation == 0)
            {
                Assert.True(_constraintEvaluator.EvaluateExpression(_eventsNotActivated, template.GetExpression()));
                Assert.False(
                    _constraintEvaluator.EvaluateExpression(_eventsNotActivated, template.GetWitnessExpression()));
            }
            else if (activation == 1)
            {
                Assert.True(_constraintEvaluator.EvaluateExpression(_eventsANotOccurs, template.GetExpression()));
                Assert.False(
                    _constraintEvaluator.EvaluateExpression(_eventsANotOccurs, template.GetWitnessExpression()));
            }
            else
            {
                Assert.True(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetExpression()));
                Assert.False(
                    _constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetWitnessExpression()));
            }
        }

        [Fact]
        public void TestLeastEvaluation()
        {
            var eventsAHolds = new List<Event>
            {
                new("a", "1"),
                new("a", "1"),
                new("a", "1"),
                new("a", "1"),
                new("b", "1")
            };

            var eventsANotHolds = new List<Event>
            {
                new("a", "1"),
                new("a", "1"),
                new("c", "1"),
                new("a", "1"),
                new("b", "1")
            };

            //a U b
            var expr = new LtlExpression(Operators.Least,
                new LtlExpression("a"),
                new LtlExpression("b"));

            //!c U b
            var exprNotC = new LtlExpression(Operators.Least,
                new LtlExpression(Operators.Not,
                    new LtlExpression("c")),
                new LtlExpression("b"));

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsAHolds, expr));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsANotHolds, expr));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsAHolds, exprNotC));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsANotHolds, exprNotC));
        }


        [Fact]
        public void TestNextEvaluation()
        {
            var eventsNextB = new List<Event>
            {
                new("a", "1"),
                new("b", "1")
            };

            //next(a)
            var exprA = new LtlExpression(Operators.Next,
                new LtlExpression("a"));

            //next(!a)
            var exprNotA = new LtlExpression(Operators.Next,
                new LtlExpression(Operators.Not, new LtlExpression("a")));

            //next(b)
            var exprB = new LtlExpression(Operators.Next,
                new LtlExpression("b"));

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsNextB, exprB));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsNextB, exprNotA));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNextB, exprA));
        }

        [Fact]
        public void TestSubsequentEvaluation()
        {
            var eventsAHolds = new List<Event>
            {
                new("a", "1"),
                new("a", "1"),
                new("a", "1")
            };

            var eventsANotHolds = new List<Event>
            {
                new("a", "1"),
                new("a", "1"),
                new("c", "1")
            };

            //subsequent(a)
            var exprA = new LtlExpression(Operators.Subsequent,
                new LtlExpression("a"));

            //subsequent(!c)
            var exprNotC = new LtlExpression(Operators.Next,
                new LtlExpression(Operators.Not, new LtlExpression("c")));

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsAHolds, exprA));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsANotHolds, exprA));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsAHolds, exprNotC));
        }

        [Fact]
        public void TestEventualEvaluation()
        {
            var eventsAHolds = new List<Event>
            {
                new("b", "1"),
                new("b", "1"),
                new("a", "1")
            };

            var eventsANotHolds = new List<Event>
            {
                new("b", "1"),
                new("b", "1"),
                new("b", "1")
            };

            //eventual(b)
            var exprA = new LtlExpression(Operators.Eventual,
                new LtlExpression("a"));

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsAHolds, exprA));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsANotHolds, exprA));
        }

        [Fact]
        public void TestAlternateResponseEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var eventsNotHolds = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("a", "1"),
                new("b", "1")
            };

            var template = new AlternateResponse("a", "b");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetExpression()));
            //This is true as there really was no other "a" until "b". => postprocessing later
            Assert.True(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetExpression()));

            CheckVacuity(template, 1);

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetFinishingExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetFinishingExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetFinishingExpression()));
        }

        [Fact]
        public void TestAlternatePrecedenceEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("b", "1")
            };

            var eventsNotHolds = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("b", "1"),
                new("b", "1")
            };

            var template = new AlternatePrecedence("a", "b");

            //Algorithm from paper cant deal with b being last in the log
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));

            //with preprocessing 
            eventsHolds = UtilMethods.PreprocessTraceForEvaluation(template, eventsHolds);
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));

            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(_eventsANotOccurs, template.GetExpression()));

            CheckVacuity(template, 2);
        }

        [Fact]
        public void TestAlternateSuccessionEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var eventsNotHolds = new List<Event>
            {
                new("a", "1"),
                new("a", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var template = new AlternateSuccession("a", "b");

            ////Algorithm from paper cant deal with b being last in the log
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));

            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetExpression()));
            //This is true as there really was no other "a" until "b". => vacuity check
            Assert.True(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(_eventsANotOccurs, template.GetExpression()));

            //finishing
            Assert.False(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetFinishingExpression()));

            //with preprocessing
            eventsHolds = UtilMethods.PreprocessTraceForEvaluation(template, eventsHolds);
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));

            eventsNotHolds = UtilMethods.PreprocessTraceForEvaluation(template, eventsNotHolds);
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetExpression()));

            //This is true as there really was no other "a" until "b". => postprocessing later
            var eventsNotFinish = UtilMethods.PreprocessTraceForEvaluation(template, _eventsBNotOccurs);
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsNotFinish, template.GetExpression()));

            var eventsOnlyB = UtilMethods.PreprocessTraceForEvaluation(template, _eventsANotOccurs);
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsOnlyB, template.GetExpression()));

            //finishing
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotFinish, template.GetFinishingExpression()));

            CheckVacuity(template, 0);
        }

        [Fact]
        public void TestChainResponseEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("b", "1")
            };

            var eventsNotHolds = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var eventsNotFinish = new List<Event>
            {
                new("a", "1")
            };

            var eventsRepeats = new List<Event>
            {
                new("a", "1"),
                new("b", "1"),
                new("c", "1"),
                new("a", "1"),
                new("c", "1")
            };

            var template = new ChainResponse("a", "b");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotFinish, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsRepeats, template.GetExpression()));

            CheckVacuity(template, 1);
        }

        [Fact]
        public void TestChainPrecedenceEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("b", "1")
            };

            var eventsNotHolds = new List<Event>
            {
                new("b", "1"),
                new("a", "1")
            };

            var eventsFar = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var template = new ChainPrecedence("a", "b");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));
            //Algorithm from paper cant deal with b being first in the log => preprocessing
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsFar, template.GetExpression()));

            //with preprocessing
            eventsNotHolds = UtilMethods.PreprocessTraceForEvaluation(template, eventsNotHolds);
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetExpression()));

            CheckVacuity(template, 2);
        }

        [Fact]
        public void TestChainSuccessionEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("b", "1")
            };

            var eventsNotHolds = new List<Event>
            {
                new("b", "1"),
                new("a", "1")
            };

            var eventsOnlyA = new List<Event>
            {
                new("a", "1")
            };

            var eventsOnlyB = new List<Event>
            {
                new("b", "1")
            };

            var template = new ChainSuccession("a", "b");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsOnlyA, template.GetExpression()));
            //Algorithm from paper cant deal with b being first in the log => preprocessing
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsOnlyB, template.GetExpression()));

            //with preprocessing
            eventsOnlyB = UtilMethods.PreprocessTraceForEvaluation(template, eventsOnlyB);
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsOnlyB, template.GetExpression()));

            CheckVacuity(template, 0);
        }

        [Fact]
        public void TestResponseEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var template = new Response("a", "b");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetExpression()));

            CheckVacuity(template, 1);
        }

        [Fact]
        public void TestPrecedenceEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var eventsStarts = new List<Event>
            {
                new("b", "1")
            };

            var template = new Precedence("a", "b");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsStarts, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(_eventsANotOccurs, template.GetExpression()));

            CheckVacuity(template, 2);
        }

        [Fact]
        public void TestSuccessionEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var template = new Succession("a", "b");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetExpression()));

            CheckVacuity(template, 0);
        }

        [Fact]
        public void TestRespondedExistenceEvaluate()
        {
            var eventsAFirst = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var eventsBFirst = new List<Event>
            {
                new("b", "1"),
                new("c", "1"),
                new("c", "1"),
                new("a", "1")
            };

            var template = new RespondedExistence("a", "b");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsAFirst, template.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsBFirst, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetExpression()));

            CheckVacuity(template, 1);
        }

        [Fact]
        public void TestNotSuccessionEvaluate()
        {
            var eventsABeforeB = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var eventsBFirst = new List<Event>
            {
                new("b", "1"),
                new("c", "1"),
                new("a", "1")
            };

            var template = new NotSuccession("a", "b");

            Assert.False(_constraintEvaluator.EvaluateExpression(eventsABeforeB, template.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsBFirst, template.GetExpression()));

            CheckVacuity(template, 0);
        }

        [Fact]
        public void TestNotChainSuccessionEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var eventsNotHolds = new List<Event>
            {
                new("a", "1"),
                new("b", "1")
            };

            var template = new NotChainSuccession("a", "b");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetExpression()));

            CheckVacuity(template, 0);
        }

        [Fact]
        public void TestNotCoexistenceEvaluate()
        {
            var eventsBoth = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var template = new NotCoexistence("a", "b");

            Assert.False(_constraintEvaluator.EvaluateExpression(eventsBoth, template.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(_eventsANotOccurs, template.GetExpression()));

            CheckVacuity(template, 0);
        }

        [Fact]
        public void TestInitEvaluate()
        {
            var eventsHolds = new List<Event>
            {
                new("a", "1"),
                new("b", "1")
            };

            var eventsNotHolds = new List<Event>
            {
                new("b", "1"),
                new("a", "1")
            };

            var template = new Init("a");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsHolds, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsNotHolds, template.GetExpression()));
        }

        [Fact]
        public void TestExistenceEvaluate()
        {
            var eventsThree = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("a", "1"),
                new("a", "1")
            };

            var eventsZero = new List<Event>
            {
                new("c", "1"),
                new("c", "1")
            };

            var eventsOnce = new List<Event>
            {
                new("b", "1"),
                new("a", "1"),
                new("b", "1")
            };

            var templateOne = new Existence(1, "a");
            var templateThree = new Existence(3, "a");
            var templateZero = new Existence(0, "a");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsThree, templateOne.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsThree, templateThree.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsThree, templateZero.GetExpression()));

            Assert.False(_constraintEvaluator.EvaluateExpression(eventsZero, templateOne.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsZero, templateZero.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsZero, templateThree.GetExpression()));

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsOnce, templateOne.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsOnce, templateZero.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsOnce, templateThree.GetExpression()));
        }

        [Fact]
        public void TestExactlyEvaluate()
        {
            var eventsThree = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("a", "1"),
                new("a", "1")
            };

            var eventsZero = new List<Event>
            {
                new("c", "1"),
                new("c", "1")
            };

            var eventsOnce = new List<Event>
            {
                new("b", "1"),
                new("a", "1"),
                new("b", "1")
            };

            var templateOne = new Exactly(1, "a");
            var templateThree = new Exactly(3, "a");
            var templateZero = new Exactly(0, "a");

            Assert.False(_constraintEvaluator.EvaluateExpression(eventsThree, templateOne.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsThree, templateThree.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsThree, templateZero.GetExpression()));

            Assert.False(_constraintEvaluator.EvaluateExpression(eventsZero, templateOne.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsZero, templateZero.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsZero, templateThree.GetExpression()));

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsOnce, templateOne.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsOnce, templateZero.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsOnce, templateThree.GetExpression()));
        }

        [Fact]
        public void TestCoexistenceEvaluate()
        {
            var eventsBoth = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("c", "1"),
                new("b", "1")
            };

            var template = new Coexistence("a", "b");

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsBoth, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(_eventsBNotOccurs, template.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(_eventsANotOccurs, template.GetExpression()));

            CheckVacuity(template, 0);
        }

        [Fact]
        public void TestAbsenceEvaluate()
        {
            var eventsThree = new List<Event>
            {
                new("a", "1"),
                new("c", "1"),
                new("a", "1"),
                new("a", "1")
            };

            var eventsZero = new List<Event>
            {
                new("c", "1"),
                new("c", "1")
            };

            var eventsOnce = new List<Event>
            {
                new("b", "1"),
                new("a", "1"),
                new("b", "1")
            };

            var templateOne = new Absence(1, "a");
            var templateTwo = new Absence(2, "a");

            Assert.Throws<ArgumentException>(() => new Absence(0, "a"));

            Assert.False(_constraintEvaluator.EvaluateExpression(eventsThree, templateOne.GetExpression()));
            Assert.False(_constraintEvaluator.EvaluateExpression(eventsThree, templateTwo.GetExpression()));

            Assert.True(_constraintEvaluator.EvaluateExpression(eventsZero, templateOne.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsZero, templateTwo.GetExpression()));

            Assert.False(_constraintEvaluator.EvaluateExpression(eventsOnce, templateOne.GetExpression()));
            Assert.True(_constraintEvaluator.EvaluateExpression(eventsOnce, templateTwo.GetExpression()));
        }
    }
}