using System.ComponentModel.DataAnnotations;
using Backend.Data.RegionDtos;
using Backend.Models;

namespace Backend.Data.OperationDTO
{
    public class OperationDto
    {
        public int Id { get; set; }

        [Required]
        public string Status { get; set; } = null!;

        [Required]
        public long LeaderOib { get; set; }

        public virtual User LeaderOibNavigation { get; set; } = null!;
        public virtual ICollection<RegionDto> Regions { get; set; }
    }
}
