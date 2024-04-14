
namespace LogImport.Models
{
    /// <summary>
    ///   Class representing an imported event log
    /// </summary>
    public class ImportedEventLog
    {
        public IEnumerable<LogColumn> Columns { get; set; }

        public ImportedEventLog(IEnumerable<LogColumn> columns)
        {
            this.Columns = columns;
        }

        public override string ToString()
        {
            return string.Join("\n", Columns.Select(c => c.ToString()));
        }
    }
}