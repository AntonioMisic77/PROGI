using System.ComponentModel.DataAnnotations;
using Backend.Models;

namespace Backend.Data.Building
{
    public class BuildingDto
    {
        public int AreaId { get; set; }

        [Required]
        public int BlockId { get; set; }

        [Required]
        public string Status { get; set; } = null!;

        public virtual Area Area { get; set; } = null!;
        public virtual Backend.Models.Block Block { get; set; } = null!;
    }
}
