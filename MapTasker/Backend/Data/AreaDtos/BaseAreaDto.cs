using Backend.Data.PointDtos;

namespace Backend.Data.AreaDtos
{
    public abstract class BaseAreaDto
    {
        public int Id { get; set; }
        public List<PointDto> Points { get; set; }
        
    }
}
