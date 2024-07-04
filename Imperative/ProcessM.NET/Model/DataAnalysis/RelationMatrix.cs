using System.Collections.Generic;

namespace ProcessM.NET.Model.DataAnalysis
{
    /// <summary>
    /// A class which represents a matrix of relations (causal footprint) of all activities in data loaded from event log
    /// as well as supplementary data which are used to better envision and use the matrix.
    /// </summary>
    public class RelationMatrix : MatrixBase
    {
        /// <summary>
        /// A relation matrix (casual footprint) of relations within two activities.
        /// </summary>
        public Relation[,] Footprint { get; }

        /// <summary>
        /// Goes through given workflow traces and marks direct succession (B comes directly after A) of all loaded activities.
        /// </summary>
        /// <param name="workflowTraces">A list of (non-timestamped) workflow traces.</param>
        private void FindSuccession(IEnumerable<WorkflowTrace> workflowTraces)
        {
            foreach (var wft in workflowTraces)
            {
                for (var i = 0; i < wft.Activities.Count - 1; i++)
                {
                    var fromIndex = ActivityIndices[wft.Activities[i]];
                    var toIndex = ActivityIndices[wft.Activities[i + 1]];
                    Footprint[fromIndex, toIndex] = Relation.Succession;
                }
            }
        }

        /// <summary>
        /// Is used to update relations after direct successions have been marked.
        /// <para>Marks two activities as parallel if A can come after B and B can come after A.</para>
        /// <para>Marks two activities as successive/predecessive if B always comes after A and A never comes after B.</para>
        /// </summary>
        private void UpdateRelations()
        {
            for (var i = 0; i < Activities.Count; i++)
            {
                for (var j = 0; j < Activities.Count; j++)
                {
                    if (Footprint[i, j] == Relation.Succession && Footprint[j, i] == Relation.Succession)
                    {
                        Footprint[i, j] = Relation.Parallelism;
                        Footprint[j, i] = Relation.Parallelism;
                    }
                    if (Footprint[i, j] == Relation.Succession && Footprint[j, i] == Relation.Independency)
                    {
                        Footprint[j, i] = Relation.Predecession;
                    }
                }
            }
        }

        /// <summary>
        /// Is used to create an empty RelationMatrix based only on given activities.
        /// </summary>
        /// <param name="activities">A list of activities in all traces.</param>
        /// <param name="startActivities">A set of activities which can appear at the beginning of traces.</param>
        /// <param name="endActivities">A set of activities which can appear at the end of traces.</param>
        public RelationMatrix(List<string> activities, HashSet<string> startActivities, HashSet<string> endActivities)
            : base(activities, startActivities, endActivities)
        {
            Footprint = new Relation[activities.Count, activities.Count];
        }

        /// <summary>
        /// Is used to create a full relation matrix based on WorkflowLog.
        /// </summary>
        /// <param name="log">A workflow log made from loaded data.</param>
        public RelationMatrix(WorkflowLog log) : base(log)
        {
            Footprint = new Relation[Activities.Count, Activities.Count];

            FindSuccession(log.WorkflowTraces);
            UpdateRelations();
        }
    }
}
