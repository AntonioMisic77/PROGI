using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services.SeedDb
{
    public class DbSeeder : IDbSeeder
    {
        #region Fields
        private readonly MapTaskerDBContext _context;

        #endregion

        #region Ctor
        public DbSeeder(MapTaskerDBContext context)
        {
                _context = context;
        }
        #endregion


        public async Task SeedDb()
        {
            await SeedRolesAsync();
            await SeedAdminAsync();
        }

        private async Task SeedRolesAsync() 
        {
            var roles = _context.Roles.ToList();

            if (roles.Count == 0)
            {
                // TODO : Dodaj ostale Role (spasioc,kartograf itd...)

                _context.Roles.Add(new Role
                {
                    Id = 1,
                    Name = "Admin"
                });

                _context.Roles.Add(new Role
                {
                    Id = 2,
                    Name = "Spasioc"
                });


                await _context.SaveChangesAsync();
            }

        }

        private async Task SeedAdminAsync()
        {
            var roles = _context.Roles.ToList();

            if (roles != null)
            {
                var userAdmin = _context.Users.FirstOrDefault(a => a.FirstName == "Admin");

                if (userAdmin == null)
                {
                    IPasswordHasher<User> hasher = new PasswordHasher<User>();

                    var admin = new User
                    {
                        Username = "ADMIN",
                        FirstName = "Admin",
                        LastName = "Administrator",
                        Email = "admin@fer.hr",
                        Photo = "https://mojaslika.hr",
                        PhoneNumber = "+385 097 451 789",
                        RoleId = 1,
                        Confirmed = true,
                        Oib = 123456789,
                        Password = ""
                    };
                    admin.Password = hasher.HashPassword(admin, "P@ssword1");

                    _context.Users.Add(admin);
                }

                await _context.SaveChangesAsync();
            }
        }
    }
}
