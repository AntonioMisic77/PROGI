using Backend.Data.UserDtos;
using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IUserService
    {
        public IEnumerable<UserDto> GetAllUsers();
        Task<UserDto> ConfirmUser(long oib,long requestOib);
        Task<UserDto> UpdateUser(EditUserDto dto, long oib);
        Task<UserDto> GetUser(long oib);
        Task<UserDto> DeleteUser(long oib);
        Task<UserDto> ChangePassword(UserDto dto);
    }
}
