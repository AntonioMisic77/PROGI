
using Backend.Data.BlockDtos;
using Backend.Data.BuildingDtos;
using Backend.Data.OperationDtos;
using Backend.Data.RegionDtos;

namespace Backend.Data.Areas
{
    public class AllAreasDto
    {
        public List<GetOperationDto> Operations { get; set; }
        public List<GetRegionDto> Regions { get; set; }
        public List<GetBlockDto> Blocks { get; set; }
        public List<GetBuildingDto> Buildings { get; set; }
    }
}
