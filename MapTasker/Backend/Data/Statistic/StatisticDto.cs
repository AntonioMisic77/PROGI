using Backend.Data.Block;
using Backend.Data.Building;
using Backend.Data.MissingReport;

namespace Backend.Data.Statistic
{
    public class StatisticDto
    {
        public ICollection<MissingReportDto> MissingReports { get; set; }

        public  ICollection<BlockDto>  Blocks { get; set; }

        public ICollection<BuildingDto> Buildings { get; set; }
    }
}
