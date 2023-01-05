using System.ComponentModel.DataAnnotations;

namespace Backend.Data.OperationDtos
{
    public class OperationStatusDto
    {
        [Required]
        public int OperationId { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public long LeaderOib { get; set; }
    }
}
