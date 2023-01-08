

using Backend.Data.BlockDtos;
using Backend.Data.BuildingDtos;
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
