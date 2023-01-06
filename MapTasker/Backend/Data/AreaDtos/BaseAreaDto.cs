using Backend.Data.PointDtos;

namespace Backend.Data.AreaDtos
{
    public abstract class BaseAreaDto
    {
        public int Id;
        public List<PointDto> Points { get; set; }
        
    }
}
