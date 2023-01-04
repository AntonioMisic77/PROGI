using System.Web.Mvc;
using AutoMapper;
using Backend.Data;
using Backend.Data.UserDtos;
using Backend.Models;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Registration
{
    public class Register : IRegister
    {
        private readonly IMapper _mapper;
        private readonly MapTaskerDBContext _context;

        public Register(IMapper mapper, MapTaskerDBContext context)
        {
            _mapper = mapper;
           _context = context;
        }

        async Task<UserDto>  IRegister.Register(UserDto user)
        {

            IPasswordHasher<User> hasher = new PasswordHasher<User>();

            var oldUser = _context.Users.Where(a => a.Email == user.Email).Count();

            if (oldUser > 0)
            {
                throw new Exception("Postoji User s takvim e-mailom");
            }

            var newUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Username = user.UserName,
                Photo = user.Photo,
                PhoneNumber = user.PhoneNumber,
                RoleId = user.RoleId,
                Oib = user.OIB,
                Confirmed = false

            };
            newUser.Password = hasher.HashPassword(newUser, user.Password);

            if (newUser != null)
            {
                _context.Users.Add(newUser);
            }

            await  _context.SaveChangesAsync();
            
            return _mapper.Map<UserDto>(newUser);
    
        }
    }
}
