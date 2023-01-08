using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Region
    {
        public Region()
        {
            Blocks = new HashSet<Block>();
        }

        public int AreaId { get; set; }
        public int OperationId { get; set; }

        public virtual Area Area { get; set; } = null!;
        public virtual Operation Operation { get; set; } = null!;
        public virtual ICollection<Block> Blocks { get; set; }
    }
}
