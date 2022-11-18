using System.ComponentModel.DataAnnotations;

namespace Backend.Data.MissingReportDTO
{
    public class MissingReportDto
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; } = null!;

        [Required]
        public string LastName { get; set; } = null!;

        [Required]
        public long Oib { get; set; }

        [Required]
        public string Photo { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime ReportedAt { get; set; }

        public DateTime? FoundAt { get; set; }
    }
}

