using LogImport.Models;
using LogImport.Exceptions;

namespace LogImport.Tests
{
    public class ImportedEventLogTests
    {
        private const int CASE_ID_COLUMN = 0;
        private const int ACTIVITY_COLUMN = 1;
        private const int TIMESTAMP_COLUMN = 2;

        private ImportedEventLog createExmapleEventLogWithoutTimeStamp()
        {
            var headers = new string[] { "CaseId", "Activity" };
            var rows = new List<string[]>
            {
                new string[] { "1", "Wake up" },
                new string[] { "1", "Watch TV" },
                new string[] { "1", "Go to sleep" },
                new string[] { "2", "Cook lunch" },
                new string[] { "2", "Play soccer" },
                new string[] { "2", "Rest" }
            };

            var log = new ImportedEventLog(rows, headers);

            log.CaseId = CASE_ID_COLUMN;
            log.Activity = ACTIVITY_COLUMN;

            return log;
        }

        private ImportedEventLog createExampleEventLogWithTimeStamp()
        {
            var headers = new string[] { "CaseId", "Activity", "Timestamp" };
            var rows = new List<string[]>
            {
                new string[] { "1", "Wake up", "04/10/2008 06:31:02" },
                new string[] { "1", "Watch TV", "04/10/2008 06:31:00" },
                new string[] { "1", "Go to sleep", "04/10/2008 06:30:00" },
                new string[] { "2", "Cook lunch", "04/10/2008 06:33:00" },
                new string[] { "2", "Play soccer", "04/10/2008 06:35:00" },
                new string[] { "2", "Rest", "04/10/2008 06:34:00" }
            };

            var log = new ImportedEventLog(rows, headers);

            log.CaseId = CASE_ID_COLUMN;
            log.Activity = ACTIVITY_COLUMN;
            log.Timestamp = TIMESTAMP_COLUMN;

            return log;
        }

        [Fact]
        public void GetCaseId_Return0()
        {
            // Arrange
            var eLog = createExampleEventLogWithTimeStamp();

            // Act
            var caseIdColumn = eLog.CaseId;

            // Assert
            Assert.Equal(CASE_ID_COLUMN, caseIdColumn);
        }

        [Fact]
        public void GetActivity_Return1()
        {
            // Arrange
            var eLog = createExampleEventLogWithTimeStamp();

            // Act
            var activityColumn = eLog.Activity;

            // Assert
            Assert.Equal(ACTIVITY_COLUMN, activityColumn);
        }

        [Fact]
        public void GetTimeStamp_Return2()
        {
            // Arrange
            var eLog = createExampleEventLogWithTimeStamp();

            // Act
            var timeStampColumn = eLog.Timestamp;

            // Assert
            Assert.Equal(TIMESTAMP_COLUMN, timeStampColumn);
        }

        [Fact]
        public void ChangeActivityColumn_Return0()
        {
            // Arrange
            var eLog = createExampleEventLogWithTimeStamp();

            // Act
            eLog.Activity = 0;
            var activityColumn = eLog.Activity;

            // Assert
            Assert.Equal(0, activityColumn);
        }

        [Fact]
        public void GetNthColumn_InRange_ReturnColumn()
        {
            // Arrange
            var eLog = createExampleEventLogWithTimeStamp();
            var expectedActivityColumn = new List<string>() { "Wake up", "Watch TV", "Go to sleep", "Cook lunch", "Play soccer", "Rest" };

            // Act
            var activityColumn = eLog.GetNthColumn(ACTIVITY_COLUMN);

            // Assert
            Assert.Equal(expectedActivityColumn, activityColumn);
        }

        [Fact]
        public void GetNthColumn_OutOfRange_ThrowException()
        {
            // Arrange
            var eLog = createExampleEventLogWithTimeStamp();

            // Act
            void act() => eLog.GetNthColumn(3);

            // Assert
            Assert.Throws<IncorrectIndexException>(act);
        }

        [Fact]
        public void GetNthColumn_EmptyRows_EmptyList()
        {
            // Arrange
            var eLog = new ImportedEventLog(new List<string[]>(), new string[] { "CaseId", "Activity", "Timestamp" });
            var expectedEmptyList = new List<string>();

            // Act
            var activityColumn = eLog.GetNthColumn(ACTIVITY_COLUMN);

            // Assert
            Assert.Equal(expectedEmptyList, activityColumn);
        }

        [Fact]
        public void GetNthRow_InRange_ReturnRow()
        {
            // Arrange
            var eLog = createExampleEventLogWithTimeStamp();
            var expectedRow = new string[] { "1", "Watch TV", "04/10/2008 06:31:00" };

            // Act
            var row = eLog.GetNthRow(1);

            // Assert
            Assert.Equal(expectedRow, row);
        }

        [Fact]
        public void GetNthRow_OutOfRange_ThrowException()
        {
            // Arrange
            var eLog = createExampleEventLogWithTimeStamp();

            // Act
            void act() => eLog.GetNthRow(6);

            // Assert
            Assert.Throws<IncorrectIndexException>(act);
        }

        [Fact]
        public void GetNthRow_EmptyRows_EmptyList()
        {
            // Arrange
            var eLog = new ImportedEventLog(new List<string[]>(), new string[] { "CaseId", "Activity", "Timestamp" });
            var expectedEmptyList = new List<string>();

            // Act
            void act() => eLog.GetNthRow(0);

            // Assert
            Assert.Throws<IncorrectIndexException>(act);
        }

        [Fact]
        public void GetTimeStamp_LogWithoutTimeStamp_Null()
        {
            // Arrange
            var eLog = createExmapleEventLogWithoutTimeStamp();

            // Act
            var timeStampColumn = eLog.Timestamp;

            // Assert
            Assert.Null(timeStampColumn);
        }
    }
}