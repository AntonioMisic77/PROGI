using System.ComponentModel.DataAnnotations;

namespace Backend.Data.UserDtos
{
    public class EditUserDto
    {
        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
