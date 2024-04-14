
namespace LogImport.Models
{
    /// <summary>
    ///    Class representing a column in the log
    /// </summary>
    public class LogColumn
    {
        /// <summary>
        ///    Header (name) of the column 
        /// </summary>
        public string Header { get; set; }

        /// <summary>
        ///   Values in the column
        /// </summary>
        public IEnumerable<string> Values { get; set; }

        public LogColumn(string header, IEnumerable<string> values)
        {
            this.Header = header;
            this.Values = values;
        }

        public override string ToString()
        {
            return $"{Header}: {string.Join(", ", Values)}";
        }
    }
}