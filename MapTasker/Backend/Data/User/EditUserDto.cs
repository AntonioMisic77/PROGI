using System.ComponentModel.DataAnnotations;

namespace Backend.Data.User
{
    public class EditUserDto
    {
        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
