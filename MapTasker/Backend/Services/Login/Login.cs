using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Data;
using Backend.Data.Login;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services.Login
{
    public class Login : ILogin
    {
        private readonly MapTaskerDBContext _context;
        private readonly IConfiguration _configuration;

        public Login(MapTaskerDBContext context,
                     IConfiguration configuration
                      )
        {
            _context = context;
            _configuration = configuration;
        }

        async Task<string> ILogin.Login(LoginDto item)
        {
            IPasswordHasher<User> hasher = new PasswordHasher<User>();

            var user = _context.Users.FirstOrDefault(a=> a.Email == item.Email);

            if (user == null) return null;

            var isUserValid = hasher.VerifyHashedPassword(user, user.Password, item.Password);

            if (isUserValid == PasswordVerificationResult.Failed) return null;

            var token = await CreateToken(user);

            return token;
        }


        public async Task<string> CreateToken(User user)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));

            var credentials = new SigningCredentials(securitykey,SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub,user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email,user.Email),
            };

            var token = new JwtSecurityToken(
                issuer : _configuration["JwtSettings:Issuer"],
                audience : _configuration["JwtSettings:Audience"],
                claims : claims,
                expires : DateTime.UtcNow.AddMinutes(Convert.ToInt32(_configuration["JwtSettings:DurationInMinutes"])),
                signingCredentials : credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
}
}
