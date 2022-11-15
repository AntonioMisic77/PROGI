﻿using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }
        [Required]
        public int ReportId { get; set; }
        [Required]
        public string Text { get; set; } = null!;
        [Required]
        public long? UserOib { get; set; }


    }
}