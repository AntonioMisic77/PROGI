using Backend.Data.Login;
using Backend.Services.Login;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogin _loginService;

        public LoginController(ILogin loginService) 
        {
            _loginService = loginService;
        }

        [HttpPost]

        public async Task<ActionResult<string>> Login([FromBody] LoginDto user)
        {
            var token = await _loginService.LogIn(user);
           
            if (token == null)
            {
                return Unauthorized("E-mail or password are inccorect");
            }
            else
            {
                return Ok(token);
            }
        }
    }
}
