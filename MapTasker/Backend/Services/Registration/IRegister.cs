﻿using System.Web.Mvc;
using Backend.Data.Register;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Registration
{
    public interface IRegister
    {
        Task<UserDto> Register(UserDto user);
    }
}