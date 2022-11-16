using Backend.Data.Register;
using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IUserService
    {
        public IEnumerable<User> GetAllUsers();

        Task<UserDto> ConfirmUser(int id);
        Task<UserDto> UpdateUser(UserDto dto);
    }
}
