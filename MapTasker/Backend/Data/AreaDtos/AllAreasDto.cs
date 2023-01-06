
using Backend.Data.BlockDtos;
using Backend.Data.BuildingDtos;
using Backend.Data.OperationDtos;
using Backend.Data.RegionDtos;

namespace Backend.Data.Areas
{
    public class AllAreasDto
    {
        public List<GetOperationDto> Operations;
        public List<GetRegionDto> Regions;
        public List<GetBlockDto> Blocks;
        public List<GetBuildingDto> Buildings;
    }
}
