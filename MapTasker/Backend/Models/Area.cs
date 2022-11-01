using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class Area
    {
        public Area()
        {
            Points = new HashSet<Point>();
        }

        public int Id { get; set; }

        public virtual Block? Block { get; set; }
        public virtual Building? Building { get; set; }
        public virtual Region? Region { get; set; }
        public virtual ICollection<Point> Points { get; set; }
    }
}
