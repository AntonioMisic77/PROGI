using System.ComponentModel.DataAnnotations;
using Backend.Models;

namespace Backend.Data.UserDtos
{
    public class UserDto
    {
        public string? UserName { get; set; }

        [Required]
        public long OIB { get; set; }

        [Required]
        public string Photo { get; set; } 

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public int RoleId { get; set; }

        public bool Confirmed { get; set; }

    }
}
