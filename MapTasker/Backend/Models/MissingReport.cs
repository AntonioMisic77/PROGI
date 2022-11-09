using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class MissingReport
    {
        public MissingReport()
        {
            Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Oib { get; set; } = null!;
        public string Photo { get; set; } = null!;
        public string? Description { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
