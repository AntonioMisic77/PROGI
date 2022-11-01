using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Point
    {
        public int Id { get; set; }
        public double Xcoordinate { get; set; }
        public double Ycoordinate { get; set; }
        public int AreaId { get; set; }
        public int OrderNumber { get; set; }

        public virtual Area Area { get; set; } = null!;
    }
}
