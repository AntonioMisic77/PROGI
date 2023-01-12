using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class User
    {
        public User()
        {
            Areas = new HashSet<Area>();
            Blocks = new HashSet<Block>();
            Comments = new HashSet<Comment>();
            Operations = new HashSet<Operation>();
        }

        public string? Username { get; set; }
        public long Oib { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Photo { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int RoleId { get; set; }
        public bool Confirmed { get; set; }

        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<Area> Areas { get; set; }
        public virtual ICollection<Block> Blocks { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Operation> Operations { get; set; }
    }
}
