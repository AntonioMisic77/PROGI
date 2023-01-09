

using Backend.Data.BlockDtos;
using Backend.Data.BuildingDtos;
using Backend.Data.MissingReportDTO;

namespace Backend.Data.StatisticDto
{
    public class StatisticDto
    {
        public int[] missingPeople { get; set; }
        public int[] foundPeople { get; set; }

        public int[] unsearchedBuildings { get; set; }

        public int[] searchedBuildings { get; set; }
    }
}
