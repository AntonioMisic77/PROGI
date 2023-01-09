using System.ComponentModel.DataAnnotations;
using Backend.Data.PointDtos;

namespace Backend.Data.BlockDtos
{
    public class CreateBlockDto
    {
   
        [Required]
        public PointDto[] Points { get; set; }
    }
}
