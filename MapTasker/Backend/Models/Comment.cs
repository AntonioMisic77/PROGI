using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Comment
    {
        public int Id { get; set; }
        public int ReportId { get; set; }
        public string Text { get; set; } = null!;
        public long? UserOib { get; set; }

        public virtual MissingReport Report { get; set; } = null!;
        public virtual User? UserOibNavigation { get; set; }
    }
}
