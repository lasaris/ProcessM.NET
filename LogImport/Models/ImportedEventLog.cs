using System.Text;
using LogImport.Exceptions;

namespace LogImport.Models
{
    public class ImportedEventLog
    {
        private string[] _headers;

        private List<string[]> _rows;

        private int _caseId;

        private int _activity;

        private int? _timestamp;

        private List<int>? _resources;

        public string[] Headers
        {
            get { return _headers; }
            set { _headers = value; }
        }

        public List<string[]> Rows
        {
            get { return _rows; }
            set { _rows = value; }
        }

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

        public int ColumnCount { get { return Headers.Length; } }

        public int RowCount { get { return Rows.Count; } }

        public ImportedEventLog(List<string[]> rows, string[] headers)
        {
            this._headers = headers;
            this._rows = rows;

            this._caseId = 0;
            this._activity = 1;
            this._timestamp = null;
            this._resources = null;
        }

        public ImportedEventLog(string[] headers) : this(new List<string[]>(), headers) { }

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

        public List<string> GetNthRow(int n)
        {
            if (n < 0 || n >= RowCount)
            {
                throw new IncorrectIndexException("Row index out of range");
            }

            return new List<string>(Rows[n]);
        }

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
    }
}