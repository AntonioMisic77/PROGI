using System.ComponentModel.DataAnnotations;

namespace Backend.Data.CommentDto
{
    public class CommentDto
    {
        public int Id { get; set; }
        [Required]
        public int ReportId { get; set; }
        [Required]
        public string Text { get; set; } = null!;

        public long? UserOib { get; set; }


    }
}
