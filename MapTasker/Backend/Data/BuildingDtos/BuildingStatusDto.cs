using System.ComponentModel.DataAnnotations;

namespace Backend.Data.BuildingDtos
{
    public class BuildingStatusDto
    {
        [Required]
        public int BuildingId { get; set; }

        [Required]
        public string Status { get; set; }

    }
}
