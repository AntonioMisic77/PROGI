using System.ComponentModel.DataAnnotations;

namespace Backend.Data.BlockDtos
{
    public class BlockStatusDto
    {
        [Required]
        public int BlockId { get; set; }

        [Required]
        public string Status { get; set; }

    }
}
