﻿using Backend.Data.Login;
using Backend.Models;

namespace Backend.Services.Login
{
    public interface ILogin
    {
        Task<string> LogIn(LoginDto item);

        Task<string> CreateToken(User user);
    }
}
