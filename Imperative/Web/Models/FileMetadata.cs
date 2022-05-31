using System;

namespace BakaMining.Models
{
    public class FileMetadata
    {
        public string Name { get; set; }
        public long Size { get; set; }
        public DateTimeOffset Modified { get; set; }
    }
}