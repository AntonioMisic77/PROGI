using Backend.Models;

namespace Backend.Services.Interfaces
{
    public interface IUserService
    {
        public IEnumerable<User> GetAllUsers();
    }
}
