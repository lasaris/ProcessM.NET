using System.Globalization;
using System.Text;
using DeclarativePM.Lib.Models.LogModels;
using LogImport.Exceptions;

namespace LogImport.Models
{
    /// <summary>
    ///    Class representing an imported event log.
    ///    
    ///    The class is used to store the imported event log in a structured way.
    /// </summary>
    public class ImportedEventLog
    {
        private string[] _headers;

        private List<string[]> _rows;

        private int _caseId;

        private int _activity;

        private int? _timestamp;

        private string? _timestampFormat;

        private List<int>? _resources;

        public string[] Headers
        {
            get { return _headers; }
            set { _headers = value; }
        }

        /// <summary>
        ///    Represents CSV rows (without headers)
        /// </summary>
        public List<string[]> Rows
        {
            get { return _rows; }
            set { _rows = value; }
        }

        /// <summary>
        ///   Represents the index of the column containing the case identifier
        /// </summary>
        public int CaseId
        {
            get { return _caseId; }
            set
            {
                if (value < 0 || value >= ColumnCount)
                {
                    throw new IncorrectIndexException("CaseId must be a valid column index");
                }
                else
                {
                    _caseId = value;
                }
            }
        }

        /// <summary>
        ///   Represents the index of the column containing the activity
        /// </summary>
        public int Activity
        {
            get { return _activity; }
            set
            {
                if (value < 0 || value >= ColumnCount)
                {
                    throw new IncorrectIndexException("Activity must be a valid column index");
                }
                else
                {
                    _activity = value;
                }
            }
        }

        /// <summary>
        ///  Represents the index of the column containing the timestamp
        /// </summary>
        public int? Timestamp
        {
            get { return _timestamp; }
            set
            {
                if (value.HasValue && (value < 0 || value >= ColumnCount))
                {
                    throw new IncorrectIndexException("Timestamp must be a valid column index");
                }
                else
                {
                    _timestamp = value;
                }
            }
        }

        /// <summary>
        ///  Represents the format of the timestamp
        /// </summary>
        public string? TimestampFormat
        {
            get { return _timestampFormat; }
            protected set
            {
                _timestampFormat = value;
            }
        }

        /// <summary>
        ///   Represents the indices of the columns containing the resources
        /// </summary>
        public List<int>? Resources
        {
            get { return _resources; }
            set
            {
                if (value != null)
                {
                    foreach (var resource in value)
                    {
                        if (resource < 0 || resource >= ColumnCount)
                        {
                            throw new IncorrectIndexException("Resource must be a valid column index");
                        }
                    }
                }
                _resources = value;
            }
        }

        /// <summary>
        ///    Represents the number of columns in the log
        /// </summary>
        public int ColumnCount { get { return Headers.Length; } }

        /// <summary>
        ///   Represents the number of rows in the log
        /// </summary>
        public int RowCount { get { return Rows.Count; } }

        /// <summary>
        ///     Initializes a new instance of the <see cref="ImportedEventLog" /> class.
        /// </summary>
        /// <param name="rows">Represents CSV rows (without headers)</param>
        /// <param name="headers">Represents CSV headers row</param> 
        public ImportedEventLog(List<string[]> rows, string[] headers) : this(rows, headers, 0, 1, null, null) { }

        public ImportedEventLog(List<string[]> rows, string[] headers, int activity, int caseId, int? timestamp,
            string? timestampFormat)
        {
            this._rows = rows;
            this._headers = headers;
            this._activity = activity;
            this._caseId = caseId;
            this._timestamp = timestamp;
            this._timestampFormat = timestampFormat;
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="ImportedEventLog" /> class.
        ///     
        ///     The Rows property is initialized as an empty list.
        /// </summary>
        /// <param name="headers">Array of headers</param>
        public ImportedEventLog(string[] headers) : this(new List<string[]>(), headers) { }

        /// <summary>
        ///     Method to get the n-th column of the log
        /// </summary>
        /// <param name="n">Specifies which column will be returned</param>
        /// <returns>A list of fields in the given column</returns>
        /// <exception cref="IncorrectIndexException">Thrown, if `n` is out of bounds</exception>
        public List<string> GetNthColumn(int n)
        {
            if (n < 0 || n >= ColumnCount)
            {
                throw new IncorrectIndexException("Column index out of range");
            }

            List<string> column = new List<string>();

            foreach (var row in Rows)
            {
                column.Add(row[n]);
            }

            return column;
        }

        /// <summary>
        ///    Method to get the n-th row of the log
        /// </summary>
        /// <param name="n">Specifies which row will be returned</param>
        /// <returns>Nth row as List of strings</returns>
        /// <exception cref="IncorrectIndexException">Thrown, if `n` is out of bounds</exception>
        public List<string> GetNthRow(int n)
        {
            if (n < 0 || n >= RowCount)
            {
                throw new IncorrectIndexException("Row index out of range");
            }

            return new List<string>(Rows[n]);
        }

        /// <summary>
        ///     Utility method used by ToString() to calculate the width needed to display a column
        /// </summary>
        /// <returns>Array of lengths of fields in each row</returns>
        private int[] GetLongestFieldsInColumns()
        {
            int[] longestFieldsInColumns = new int[ColumnCount];

            for (int i = 0; i < ColumnCount; i++)
            {
                longestFieldsInColumns[i] = Headers[i].Length;
            }

            foreach (var row in Rows)
            {
                for (int i = 0; i < ColumnCount; i++)
                {
                    if (row[i].Length > longestFieldsInColumns[i])
                    {
                        longestFieldsInColumns[i] = row[i].Length;
                    }
                }
            }

            return longestFieldsInColumns;
        }

        /// <summary>
        ///    Method to convert the log to a string
        /// </summary>
        /// <returns>Stringified CSV log</returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            var longestFieldsInColumns = GetLongestFieldsInColumns();

            for (int i = 0; i < ColumnCount; i++)
            {
                sb.Append(Headers[i].PadRight(longestFieldsInColumns[i] + 1));
                sb.Append("| ");
            }

            sb.AppendLine();
            sb.Append('-', longestFieldsInColumns.Sum() + 3 * ColumnCount - 1);
            sb.AppendLine();

            foreach (var row in Rows)
            {
                for (int i = 0; i < ColumnCount; i++)
                {
                    sb.Append(row[i].PadRight(longestFieldsInColumns[i] + 1));
                    sb.Append("| ");
                }

                sb.AppendLine();
            }

            return sb.ToString();
        }

        /// <summary>
        ///   Method to set the column index of the case identifier
        /// </summary>
        /// <param name="timestampFormat">TimeStamp format</param>
        /// <returns>True if TimeStamp format matches all rows</returns>
        public bool TrySetTimestampFormat(string timestampFormat)
        {
            if (!Timestamp.HasValue || Timestamp.Value < 0 || Timestamp.Value >= Headers.Length)
            {
                return false;
            }

            foreach (var row in Rows)
            {
                var rowTimeStamp = row[Timestamp.Value];
                bool parseSuccess = DateTime.TryParseExact(rowTimeStamp, timestampFormat, CultureInfo.CurrentCulture, DateTimeStyles.None, out _);

                if (!parseSuccess)
                {
                    return false;
                }
            }

            TimestampFormat = timestampFormat;
            return true;
        }

        /// <summary>
        ///   Method to set the column index of the case identifier
        /// </summary>
        /// <param name="timestamp">Name of column to be set as timestamp</param>
        /// <param name="timestampFormat">TimeStamp format</param>
        /// <param name="failedToParseTimestamp">Output parameter for return message</param>
        /// <returns>True if TimeStamp format matches all rows</returns>
        public bool TrySetTimestampFormat(string timestamp, string timestampFormat, out string failedToParseTimestamp)
        {
            var timeStampIndex = this.Headers.ToList().IndexOf(timestamp);
            if (timeStampIndex == -1)
            {
                failedToParseTimestamp = "";
                return false;
            }

            foreach (var row in Rows)
            {
                var rowTimeStamp = row[timeStampIndex];
                bool parseSuccess = DateTime.TryParseExact(rowTimeStamp, timestampFormat, CultureInfo.CurrentCulture, DateTimeStyles.None, out _);

                if (!parseSuccess)
                {
                    failedToParseTimestamp = rowTimeStamp;
                    return false;
                }
            }

            failedToParseTimestamp = "";
            TimestampFormat = timestampFormat;
            return true;
        }

        public EventLog BuildEventLog()
        {
            var events = new List<Event>(Rows.Capacity);

            events.AddRange(Rows.Select(row =>
            {
                var e = new Event(
                    row[Activity],
                    row[CaseId]
                );

                if (Timestamp.HasValue && Timestamp < Headers.Length && TimestampFormat != null)
                {
                    e.TimeStamp = DateTime.ParseExact(row[Timestamp.Value], TimestampFormat, CultureInfo.CurrentCulture);
                }

                return e;
            }));

            // If the log has timestamps, then the events can be ordered by timestamp here
            if (Timestamp.HasValue)
            {
                events = events.OrderBy(e => e.TimeStamp).ToList();
            }

            return new EventLog(events, Headers.ToList());
        }
    }
}