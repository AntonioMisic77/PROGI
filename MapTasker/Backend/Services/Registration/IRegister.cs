using System.Web.Mvc;
using Backend.Data.UserDtos;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Registration
{
    public interface IRegister
    {
        Task<UserDto> Registration (UserDto user);
    }
}
