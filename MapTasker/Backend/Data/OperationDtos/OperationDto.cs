using System.ComponentModel.DataAnnotations;
using Backend.Data.RegionDtos;
using Backend.Models;

namespace Backend.Data.OperationDtos
{
    public class OperationDto
    {
        public string Name { get; set; }

        [Required]
        public long LeaderOib { get; set; }
        public RegionDto[] Regions { get; set; }
    }
}
