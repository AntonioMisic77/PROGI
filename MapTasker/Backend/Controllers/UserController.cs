
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Data.UserDtos;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public static long getRequesterOib(HttpRequest request)
        {
            var handler = new JwtSecurityTokenHandler();
            string token = request.Headers["Authorization"];
            if (token == null) throw new InvalidDataException("No such user");
            token = token.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            return long.Parse(jsonToken!.Claims.FirstOrDefault(claim => claim.Type == "given_name")!.Value);
        }

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<UserDto> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        [HttpPut("confirm/{oib}")]
        [Authorize]
        public async Task<ActionResult<UserDto>> ConfirmUser(long oib)
        {
            long requesterOib = getRequesterOib(Request);

            try
            {
                var user = await _userService.ConfirmUser(oib, requesterOib);
                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }
        }

        [HttpPut("password/{oib}")]
        [Authorize]
        public async Task<ActionResult<UserDto>> ChangePassword(UserDto dto)
        {
            try
            {
                return await _userService.ChangePassword(dto);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<UserDto>> UpdateUser(EditUserDto dto)
        {
            try
            {
                return await _userService.UpdateUser(dto, getRequesterOib(Request));

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpGet("{oib}")]
        public async Task<ActionResult<UserDto>> GetUser(long oib) 
        { 
           return await _userService.GetUser(oib); 
        }

        [HttpDelete("{oib}")]
        [Authorize]
        public async Task<ActionResult<UserDto>> DeleteUser(long oib)
        {
            return await _userService.DeleteUser(oib);
        }

        [HttpGet("role")]
        public async Task<ActionResult<UserDto>> GetUser()
        {
            try
            {
                long oib = getRequesterOib(Request);
                var user = await _userService.GetUser(oib);
                return user;   
            }
            catch (InvalidDataException)
            {
                return BadRequest();
            }
        }
    }
}