using Deedle;

namespace ProcessM.NET.Model
{
    /// <summary>
    /// This class contains a data frame with loaded data from CSVImport class as well as several methods
    /// for setting up meta-data for further use of loaded data.
    /// </summary>
    public class ImportedEventLog
    {
        public Frame<int, string> Contents { get; protected set; }
        public string CaseId { get; protected set; } = null;
        public string Activity { get; protected set; } = null;
        public string Timestamp { get; protected set; } = null;


        public ImportedEventLog(Frame<int, string> data)
        {
            Contents = data;
        }

        /// <summary>
        /// Checks whether such key (column name) which was given by the user exists in loaded data.
        /// </summary>
        /// <param name="key">String value of given key (column name).</param>
        /// <returns>True if such key exists in loaded data, else returns false.</returns>
        private bool KeyInColumns(string key)
        {
            foreach (string k in Contents.ColumnKeys)
            {
                if (k == key)
                {
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// Sets a key (column name) which should be considered as "activity" for the purpouses of discovery algorithms.
        /// </summary>
        /// <param name="activity">String value of a key (column name) to be set as "activity".</param>
        /// <returns>True if a key has been successfuly set as activity, else returns false.</returns>
        public bool SetActivity(string activity)
        {
            if (!KeyInColumns(activity))
            {
                return false;
            }

            Activity = activity;
            return true;
        }

        /// <summary>
        /// Sets a key (column name) which should be considered as "Case ID" for the purpouses of discovery algorithms.
        /// </summary>
        /// <param name="caseId">String value of a key (column name) to be set as "case ID".</param>
        /// <returns>True if a key has been successfuly set as activity, else returns false.</returns>
        public bool SetCaseId(string caseId)
        {
            if (!KeyInColumns(caseId))
            {
                return false;
            }

            CaseId = caseId;
            return true;
        }

        /// <summary>
        /// Sets a key (column name) which should be considered as "timestamp" for the purpouses of discovery algorithms.
        /// <para>Note: The values in this column need to be parsable by DateTime.TryParse(string ...) method in order for 
        /// ordering activities by timestamps to work properly.</para>
        /// </summary>
        /// <param name="timestamp">String value of a key (column name) to be set as "timestamp".</param>
        /// <returns>True if a key has been successfuly set as activity, else returns false.</returns>
        public bool SetTimestamp(string timestamp)
        {
            if (!KeyInColumns(timestamp))
            {
                return false;
            }

            Timestamp = timestamp;
            return true;
        }

    }
}
