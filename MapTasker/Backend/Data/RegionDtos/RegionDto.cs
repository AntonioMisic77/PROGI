﻿
using Backend.Models;

namespace Backend.Data.RegionDtos
{
    public class RegionDto
    {
        public int AreaId { get; set; }
        public int OperationId { get; set; }

        public virtual Area Area { get; set; } = null!;
        public virtual Backend.Models.Operation Operation { get; set; } = null!;
        public virtual ICollection<Block> Blocks { get; set; }
        public virtual ICollection<Tuple<double, double>> Coordinates { get; set;}
    }
}
