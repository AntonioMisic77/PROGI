
using Backend.Data.Register;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    { 
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        [HttpPut] 

        public async Task<ActionResult<UserDto>> ConfirmUser(int id)
        {
            return await _userService.ConfirmUser(id);
        }

        [HttpPut]
        public async Task<ActionResult<UserDto>> UpdateUser(UserDto dto)
        {
            return await _userService.UpdateUser(dto);
        }

    }
}