using Backend.Data.AreaDtos;

namespace Backend.Data.BuildingDtos
{
    public class GetBuildingDto : BaseAreaDto
    {
        public int BlockId { get; set; }

        public string Status { get; set; }
    }
}
