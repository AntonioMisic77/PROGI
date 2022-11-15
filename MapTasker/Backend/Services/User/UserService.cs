using Backend.Data;
using Backend.Data.Register;
using Backend.Models;
using Backend.Services.Interfaces;

namespace Backend.Services.Implementations
{
    public class UserService : IUserService
    {

        private MapTaskerDBContext _context;

        public UserService(MapTaskerDBContext context)
        {
            _context = context;
        }

        public Task<UserDto> ConfirmUser(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users;
        }
    }
}
