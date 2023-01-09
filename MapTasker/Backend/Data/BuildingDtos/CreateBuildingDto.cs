using System.ComponentModel.DataAnnotations;
using Backend.Data.PointDtos;

namespace Backend.Data.BuildingDtos
{
    public class CreateBuildingDto
    {
        [Required]
        public PointDto[] Points { get; set; }
    }
}
