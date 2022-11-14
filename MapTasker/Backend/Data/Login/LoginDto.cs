using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Login
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email is required")]
        [StringLength(50, ErrorMessage = "Email length must be between {2} and {1} characters", MinimumLength = 3)]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is requiured")]
        [StringLength(100, ErrorMessage = "Password length must be between {2} and {1}", MinimumLength = 5)]

        public string Password { get; set; }
    }
}
