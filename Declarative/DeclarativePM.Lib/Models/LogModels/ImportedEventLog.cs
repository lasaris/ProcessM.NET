using System;
using System.Collections.Generic;
using System.Linq;
using DeclarativePM.Lib.Exceptions;

namespace DeclarativePM.Lib.Models.LogModels
{
    /// <summary>
    ///     Represents configurable imported event log
    /// </summary>
    public class ImportedEventLog
    {
        private int _activity;

        private int _caseId = 1;

        private List<int> _resources;

        private int _timeStamp = -1;


        private readonly List<string[]> rows;

        public ImportedEventLog(List<string[]> rows, string[] headers)
        {
            if (headers.Length < 2)
                throw new Exception("Not enough columns");
            Headers = headers;
            if (rows.Any(r => r.Length != headers.Length))
                throw new Exception("Some rows were of different length then others.");
            this.rows = rows;
            _resources = Enumerable.Range(2, headers.Length - 2).ToList();
        }

        public string[] Headers { get; }

        public string Activity()
        {
            return Headers[_activity];
        }

        public string CaseId()
        {
            return Headers[_caseId];
        }

        public string TimeStamp()
        {
            if (_timeStamp == -1)
                throw new LogValueNotSetException(
                    "TimeStamp property is not defined. You can define it by calling ChooseTokens method.");
            return Headers[_timeStamp];
        }

        public List<string> Resources()
        {
            return _resources.Select(r => Headers[r]).ToList();
        }

        /// <summary>
        ///     Changes column types
        /// </summary>
        /// <param name="activity">column/header string for activity</param>
        /// <param name="caseId">column/header string for case</param>
        /// <param name="timeStamp">column/header string for time stamp</param>
        /// <param name="resources">column/header string resource</param>
        /// <exception cref="Exception">One of columns does not exist</exception>
        public void ChooseTokens(string activity = null, string caseId = null, string timeStamp = null,
            params string[] resources)
        {
            if (timeStamp is not null && !Headers.Contains(timeStamp) ||
                !Headers.Contains(activity) || !Headers.Contains(caseId) ||
                resources.Any(v => !Headers.Contains(v)))
                throw new Exception("One of the values in headers does not exist.");

            _activity = Array.IndexOf(Headers, activity);
            _caseId = Array.IndexOf(Headers, caseId);

            if (timeStamp is null) return;
            _timeStamp = Array.IndexOf(Headers, timeStamp);

            _resources = resources.Select(r => Array.IndexOf(Headers, r)).ToList();
        }

        /// <summary>
        ///     Changes column type to activity
        /// </summary>
        /// <param name="activity">column/header string</param>
        /// <exception cref="Exception">Column does not exist</exception>
        public void ChangeActivity(string activity)
        {
            if (!Headers.Contains(activity))
                throw new Exception($"Header {activity} does not exist in the current log");

            _activity = Array.IndexOf(Headers, activity);

            if (_resources.Contains(_activity))
                _resources.Remove(_activity);
        }

        /// <summary>
        ///     Changes column type to case
        /// </summary>
        /// <param name="case">column/header string</param>
        /// <exception cref="Exception">Column does not exist</exception>
        public void ChangeCase(string @case)
        {
            if (!Headers.Contains(@case))
                throw new Exception($"Header {@case} does not exist in the current log");

            _caseId = Array.IndexOf(Headers, @case);

            if (_resources.Contains(_caseId))
                _resources.Remove(_caseId);
        }

        /// <summary>
        ///     Changes column type to timestamp
        /// </summary>
        /// <param name="timestamp">column/header string</param>
        /// <exception cref="Exception">Column does not exist</exception>
        public void ChangeTimestamp(string timestamp)
        {
            if (!Headers.Contains(timestamp))
                throw new Exception($"Header {timestamp} does not exist in the current log");

            _timeStamp = Array.IndexOf(Headers, timestamp);

            if (_resources.Contains(_timeStamp))
                _resources.Remove(_timeStamp);
        }

        /// <summary>
        ///     Changes column type to resource
        /// </summary>
        /// <param name="resource">column/header string</param>
        /// <exception cref="Exception">Column does not exist</exception>
        public void ChangeResource(string resource)
        {
            if (!Headers.Contains(resource))
                throw new Exception($"Header {resource} does not exist in the current log");

            _resources.Add(Array.IndexOf(Headers, resource));
        }

        public EventLog BuildEventLog(string name = null)
        {
            var events = new List<Event>(rows.Capacity);
            Func<string[], DateTime> converter = row => DateTime.TryParse(row[_timeStamp], out var time)
                ? time
                : DateTime.MinValue;
            events.AddRange(rows
                .Select(row =>
                {
                    var e = new Event(
                        row[_activity],
                        row[_caseId],
                        _resources.Select(r => row[r]).ToArray());
                    if (_timeStamp > 0)
                        e.TimeStamp = converter(row);
                    return e;
                }));
            return new EventLog(events, Headers.ToList(), name);
        }
    }
}