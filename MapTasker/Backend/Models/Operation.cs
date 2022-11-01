using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Operation
    {
        public Operation()
        {
            Regions = new HashSet<Region>();
        }

        public int Id { get; set; }
        public string Status { get; set; } = null!;
        public long LeaderOib { get; set; }

        public virtual User LeaderOibNavigation { get; set; } = null!;
        public virtual ICollection<Region> Regions { get; set; }
    }
}
