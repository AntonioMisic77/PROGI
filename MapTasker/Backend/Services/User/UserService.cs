using AutoMapper;
using Backend.Data;
using Backend.Data.UserDtos;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Implementations
{
    public class UserService : IUserService
    {

        private MapTaskerDBContext _context;
        private readonly IMapper _mapper;

        public UserService(MapTaskerDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserDto> ConfirmUser(long oib,long requestedOib)
        {
           
            var admin = await GetUser(requestedOib);

            if (admin.RoleId != 1)
            {
                throw new Exception("Ne mozes pristupiti ovome");
            }

            var user = await _context.Users.FindAsync(oib);

            user.Confirmed = true;

            _context.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }

        public IEnumerable<UserDto> GetAllUsers()
        {
            var users = _context.Users.ToList();
            var userDtos = new List<UserDto>();
            return _mapper.Map(users, userDtos);
            
        }

        public async Task<UserDto> UpdateUser(EditUserDto dto, long oib)
        {
            var user = _context.Users.FirstOrDefault(a => a.Oib == oib);

            if (user == null)
            {
                throw new InvalidDataException("No such user.");
            }

            
            user.PhoneNumber = dto.PhoneNumber;
            user.Email = dto.Email;

            _context.Attach(user);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> ChangePassword(UserDto dto)
        {
            IPasswordHasher<User> hasher = new PasswordHasher<User>();

            var user = _context.Users.FirstOrDefault(a => a.Oib == dto.OIB);

            if (user == null)
            {
                throw new InvalidDataException("No such user");
            }

            user.Password = hasher.HashPassword(user,dto.Password);

            _context.Attach(user);
            _context.Entry(user).State= EntityState.Modified;
            await _context.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }
        public async Task<UserDto> GetUser(long oib) 
        {
            var user = await _context.Users.FindAsync(oib);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> DeleteUser(long oib)
        {
            var user = await _context.Users.FindAsync(oib);

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }
    }
}
