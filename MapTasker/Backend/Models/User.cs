using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class User
    {
        public User()
        {
            Operations = new HashSet<Operation>();
        }

        public string? Username { get; set; }
        public long Oib { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Photo { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int RoleId { get; set; }
        public bool Confirmed { get; set; }

        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<Operation> Operations { get; set; }
    }
}
