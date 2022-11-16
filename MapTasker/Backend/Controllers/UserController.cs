
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Data.Register;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

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

        [HttpPut("{oib}")]
        public async Task<ActionResult<UserDto>> ConfirmUser(long oib)
        {
            var handler = new JwtSecurityTokenHandler();
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            string requestedOib = jsonToken.Claims.FirstOrDefault(claim => claim.Type == "given_name").Value;

            try
            {
                var user = await _userService.ConfirmUser(oib,long.Parse(requestedOib));
                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<UserDto>> UpdateUser(UserDto dto)
        {
            return await _userService.UpdateUser(dto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(long oib) 
        { 
           return await _userService.GetUser(oib); 
        }

        [HttpDelete("{oib}")]
        public async Task<ActionResult<UserDto>> DeleteUser(long oib)
        {
            return await _userService.DeleteUser(oib);
        }
    }
}