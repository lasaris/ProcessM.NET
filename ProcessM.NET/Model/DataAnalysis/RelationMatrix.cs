using System.Collections.Generic;

namespace ProcessM.NET.Model.DataAnalysis
{
    /// <summary>
    /// A class which represents a matrix of relations (causal footprint) of all activities in data loaded from event log
    /// as well as supplementary data which are used to better envision and use the matrix.
    /// </summary>
    public class RelationMatrix
    {
        /// <summary>
        /// A list of activities observed in event log.
        /// </summary>
        public List<string> Activities { get; }

        /// <summary>
        /// A dictionary of activity to index mapping in relation matrix (causal footprint).
        /// </summary>
        public Dictionary<string, int> ActivityIndices { get; }

        /// <summary>
        /// A set of activities which appear at the beginning of observed traces.
        /// </summary>
        public HashSet<string> StartActivities { get; }

        /// <summary>
        /// A set of activities which appear at the end of observed traces.
        /// </summary>
        public HashSet<string> EndActivities { get; }

        /// <summary>
        /// A relation matrix (casual footprint) of relations within two activities.
        /// </summary>
        public Relation[,] Footprint { get; }

        /// <summary>
        /// Goes through given list of workflow traces and fills the Activities, StartActivities, EndActivities and ActivityIndices fields.
        /// </summary>
        /// <param name="workflowTraces">A list of (non-timestamped) workflow traces.</param>
        private void FillActivities(List<WorkflowTrace> workflowTraces)
        {
            foreach (WorkflowTrace wft in workflowTraces)
            {
                StartActivities.Add(wft.Activities[0]);
                EndActivities.Add(wft.Activities[wft.Activities.Count - 1]);

                foreach (string a in wft.Activities)
                {
                    if (!Activities.Contains(a))
                    {
                        ActivityIndices.Add(a, Activities.Count);
                        Activities.Add(a);
                    }
                }
            }
        }

        /// <summary>
        /// Goes through given workflow traces and marks direct succession (B comes directly after A) of all loaded activities.
        /// </summary>
        /// <param name="workflowTraces">A list of (non-timestamped) workflow traces.</param>
        private void FindSuccession(List<WorkflowTrace> workflowTraces)
        {
            foreach (WorkflowTrace wft in workflowTraces)
            {
                for (int i = 0; i < wft.Activities.Count - 1; i++)
                {
                    int fromIndex = ActivityIndices[wft.Activities[i]];
                    int toIndex = ActivityIndices[wft.Activities[i + 1]];
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
            for (int i = 0; i < Activities.Count; i++)
            {
                for (int j = 0; j < Activities.Count; j++)
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
        {
            Activities = activities;
            StartActivities = startActivities;
            EndActivities = endActivities;
            ActivityIndices = new Dictionary<string, int>();

            int i = 0;
            foreach (string activity in activities)
            {
                ActivityIndices.Add(activity, i);
                i++;
            }

            Footprint = new Relation[activities.Count, activities.Count];
        }

        /// <summary>
        /// Is used to create a full relation matrix based on WorkflowLog.
        /// </summary>
        /// <param name="log">A workflow log made from loaded data.</param>
        public RelationMatrix(WorkflowLog log)
        {
            StartActivities = new HashSet<string>();
            EndActivities = new HashSet<string>();
            Activities = new List<string>();
            ActivityIndices = new Dictionary<string, int>();
            FillActivities(log.WorkflowTraces);

            Footprint = new Relation[Activities.Count, Activities.Count];

            FindSuccession(log.WorkflowTraces);
            UpdateRelations();
        }
    }
}
