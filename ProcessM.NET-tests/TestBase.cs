using System;
using System.IO;

namespace ProcessM.NETtests
{
    public class TestBase
    {
        public static readonly string workingDirectory = Environment.CurrentDirectory;
        public static readonly string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;

        public static readonly string separator = Path.DirectorySeparatorChar.ToString();
        public static readonly string heuristicCsv = projectDirectory + separator + "Files" + separator + "heuristic.csv";
        public static readonly string hardCsv = projectDirectory + separator + "Files" + separator + "longheuristic.csv";
    }
}
