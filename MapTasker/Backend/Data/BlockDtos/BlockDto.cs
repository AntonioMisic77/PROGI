using System.ComponentModel.DataAnnotations;
using Backend.Models;

namespace Backend.Data.BlockDtos
{
    public class BlockDto
    {
        [Required]
        public int AreaId { get; set; }

        [Required]
        public string Status { get; set; } = null!;

        [Required]
        public int RegionId { get; set; }

        [Required]
        public long? ActiveForOib { get; set; }

        public virtual User? ActiveForOibNavigation { get; set; }
        public virtual Area Area { get; set; } = null!;
        public virtual Backend.Models.Region Region { get; set; } = null!;
        public virtual ICollection<Building> Buildings { get; set; }
    }
}
