using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Building
    {
        public int AreaId { get; set; }
        public int BlockId { get; set; }
        public string Status { get; set; } = null!;

        public virtual Area Area { get; set; } = null!;
        public virtual Block Block { get; set; } = null!;
    }
}
