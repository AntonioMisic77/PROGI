using Backend.Data.UserDtos;
using Backend.Services.Registration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private UserDto result;
        private readonly IRegister _registerService;

        public RegisterController(IRegister registerService)
        {
            _registerService = registerService;
        }

        [HttpPost]

        public async Task<ActionResult<UserDto>> Register(UserDto user) 
        {
            try
            {
                result = await _registerService.Registration(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(result);
        }
    }
}
