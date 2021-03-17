using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessM.NET.Discovery.Heuristic_Miner
{
    public class DependencyGraph
    {
        private int _freqThreshold;

        public int FreqThreshold
        {
            get => _freqThreshold;

            set
            {
                _freqThreshold = value;
                _graph = null;
            }
        }

        private float _dependencyThreshold;

        public float DependencyThreshold
        {
            get => _dependencyThreshold;

            set
            {
                _dependencyThreshold = value;
                _graph = null;
            }
        }

        public DirectlyFollowsMatrix DirectMatrix { get; }

        public DependencyMatrix DependencyMatrix { get; }

        private Dictionary<string, HashSet<string>> _graph = null;

        public Dictionary<string, HashSet<string>> Graph
        {
            get
            {
                if(_graph == null) 
                { 
                    CreateDependencyGraph();
                }
                return _graph;
            }
        }

        private void CreateDependencyGraph()
        {
            _graph = new Dictionary<string, HashSet<string>>();
            for (int i = 0; i < DirectMatrix.Activities.Count; i++){
                var activity = DirectMatrix.Activities[i];
                var following = new HashSet<string>();
                for (int j = 0; j < DirectMatrix.Activities.Count; j++)
                {
                    if (DirectMatrix.Matrix[i, j] > FreqThreshold && DependencyMatrix.Matrix[i, j] > DependencyThreshold)
                    {
                        following.Add(DirectMatrix.Activities[j]);
                    }
                }
                Graph.Add(activity, following);
            }
        }

        public DependencyGraph (DirectlyFollowsMatrix directMatrix, int minFreq = 1, float minDependency = 0.5f)
        {
            FreqThreshold = minFreq;
            DependencyThreshold = minDependency;
            DirectMatrix = directMatrix;
            DependencyMatrix = new DependencyMatrix(directMatrix);
            CreateDependencyGraph();
        }
    }
}
