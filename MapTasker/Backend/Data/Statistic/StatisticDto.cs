﻿

using Backend.Data.BlockDTO;
using Backend.Data.BuildingDTO;
using Backend.Data.MissingReportDTO;

namespace Backend.Data.StatisticDto
{
    public class StatisticDto
    {
        public ICollection<MissingReportDto> MissingReports { get; set; }

        public  ICollection<BlockDto>  Blocks { get; set; }

        public ICollection<BuildingDto> Buildings { get; set; }
    }
}