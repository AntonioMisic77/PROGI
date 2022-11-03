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

        public async Task<string> Login([FromBody] LoginDto user)
        {
            return await _loginService.Login(user);
        }
    }
}
