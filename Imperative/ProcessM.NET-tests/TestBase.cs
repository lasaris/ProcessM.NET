using System;
using System.IO;

namespace ProcessM.NETtests
{
    public class TestBase
    {
        public static readonly string workingDirectory = Environment.CurrentDirectory;
        public static readonly string projectDirectory = Directory.GetParent(workingDirectory).Parent.Parent.FullName;

        public static readonly string separator = Path.DirectorySeparatorChar.ToString();

        // Heuristic CSV
        public static readonly string heuristicCsv = projectDirectory + separator + "Files" + separator + "heuristic.csv";
        public static readonly int heuristicCsvActivity = 1;
        public static readonly int heuristicCsvCaseId = 0;

        // Extremely easy CSV
        public static readonly string extremelyEasyCsv = projectDirectory + separator + "Files" + separator + "easyalpha.csv";
        public static readonly int extremelyEasyCsvActivity = 1;
        public static readonly int extremelyEasyCsvCaseId = 0;

        // Alpha CSV
        public static readonly string alphaCsv = projectDirectory + separator + "Files" + separator + "alpha.csv";
        public static readonly int alphaCsvActivity = 1;
        public static readonly int alphaCsvCaseId = 0;

        // Easy CSV
        public static readonly string easyCsv = projectDirectory + separator + "Files" + separator + "alpha2.csv";
        public static readonly int easyCsvActivity = 1;
        public static readonly int easyCsvCaseId = 0;

        // Hard CSV
        public static readonly string hardCsv = projectDirectory + separator + "Files" + separator + "longheuristic.csv";
        public static readonly int hardCsvActivity = 1;
        public static readonly int hardCsvCaseId = 0;

        // Very hard CSV
        public static readonly string veryHardCsv = projectDirectory + separator + "Files" + separator + "alphaHard.csv";
        public static readonly int veryHardCsvActivity = 1;
        public static readonly int veryHardCsvCaseId = 0;

        // Cycle Net CSV
        public static readonly string cycleNetCsv = projectDirectory + separator + "Files" + separator + "cycleNet.csv";
        public static readonly int cycleNetCsvActivity = 1;
        public static readonly int cycleNetCsvCaseId = 0;

        // Semicolon CSV
        public static readonly string semicolonCsv = projectDirectory + separator + "Files" + separator + "alpha1.csv";
        public static readonly int semicolonCsvActivity = 1;
        public static readonly int semicolonCsvCaseId = 0;

        // Tampered Hard CSV 
        public static readonly string tamperedHardCsv = projectDirectory + separator + "Files" + separator + "tamperedAlpha.csv";
        public static readonly int tamperedHardCsvActivity = 1;
        public static readonly int tamperedHardCsvCaseId = 0;

        // Random CSV log
        public static readonly string randomLog = projectDirectory + separator + "Files" + separator + "randomLog.csv";
        public static readonly int randomCsvActivity = 1;
        public static readonly int randomCsvCaseId = 0;

        // Timestamped CSV
        public static readonly string timestampedCsv = projectDirectory + separator + "Files" + separator + "alpha3.csv";
        public static readonly int timestampedCsvCaseId = 0;
        public static readonly int timestampedCsvActivity = 1;
        public static readonly int timestampedCsvTimestamp = 2;

        public static readonly string veryHardPnml = projectDirectory + separator + "Files" + separator + "hardPetriNet.xml";
        public static readonly string hardPnml = projectDirectory + separator + "Files" + separator + "net.xml";
        public static readonly string cycleNetPnml = projectDirectory + separator + "Files" + separator + "cycleNet.xml";
    }
}
