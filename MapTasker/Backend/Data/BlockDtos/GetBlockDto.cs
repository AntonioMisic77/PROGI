using Backend.Data.AreaDtos;

namespace Backend.Data.BlockDtos
{
    public class GetBlockDto : BaseAreaDto
    {
        public int RegionId { get; set; }
        public string Status { get; set; }
    }
}
