using Backend.Data.Register;
using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IUserService
    {
        public IEnumerable<User> GetAllUsers();
        Task<UserDto> ConfirmUser(long oib,long requestOib);
        Task<UserDto> UpdateUser(UserDto dto);
        Task<UserDto> GetUser(long oib);

        Task<UserDto> DeleteUser(long oib);
    }
}
