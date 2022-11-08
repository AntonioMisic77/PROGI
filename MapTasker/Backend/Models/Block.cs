using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Block
    {
        public Block()
        {
            Buildings = new HashSet<Building>();
        }

        public int AreaId { get; set; }
        public string Status { get; set; } = null!;
        public int RegionId { get; set; }
        public long? ActiveForOib { get; set; }

        public virtual User? ActiveForOibNavigation { get; set; }
        public virtual Area Area { get; set; } = null!;
        public virtual Region Region { get; set; } = null!;
        public virtual ICollection<Building> Buildings { get; set; }
    }
}
