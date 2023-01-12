using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Configuration;
using Backend.Data;
using Backend.Data.UserDtos;
using Backend.Models;
using Backend.Services.Implementations;
using Backend.Services.Login;
using Backend.Services.Registration;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace MapTasker.Tests.Services
{
    public class UserServiceTests
    {
        #region Helpers
        private async Task<MapTaskerDBContext> GetDbContext()
        {
            var dbOptions = new DbContextOptionsBuilder<MapTaskerDBContext>()
                           .UseInMemoryDatabase(databaseName : Guid.NewGuid().ToString())
                           .Options;

            var dbContext = new MapTaskerDBContext(dbOptions);

            dbContext.Database.EnsureCreated();

                dbContext.Roles.Add(new Role
                {
                    Id = 1,
                    Name = "Admin"
                });

                await dbContext.SaveChangesAsync();

                dbContext.Roles.Add(new Role
                {
                    Id = 2,
                    Name = "Spasioc"
                });

                await dbContext.SaveChangesAsync();


                dbContext.Roles.Add(new Role
                {
                    Id = 3,
                    Name = "Kartograf"
                });

                await dbContext.SaveChangesAsync();
           
             IPasswordHasher<User> hasher = new PasswordHasher<User>();

                    var admin = new User
                    {
                        Username = "ADMIN",
                        FirstName = "Admin",
                        LastName = "Administrator",
                        Email = "admin@fer.hr",
                        Photo = null,
                        PhoneNumber = "+385 097 451 789",
                        RoleId = 1,
                        Confirmed = true,
                        Oib = 123456789,
                        Password = ""
                    };
                    var password = hasher.HashPassword(admin, "P@ssword1");
                    admin.Password = password;

                    dbContext.Users.Add(admin);


                   var user = new User
                    {
                        Username = "Antonio",
                        FirstName = "Antonio",
                        LastName = "Misic",
                        Email = "antoniohej@gmail.com",
                        Photo = null,
                        PhoneNumber = "+385 097 451 789",
                        RoleId = 2,
                        Confirmed = false,
                        Oib = 12345678912,
                        Password = ""
                    };
                   password = hasher.HashPassword(admin, "P@ssword2");
                   user.Password = password;

                    dbContext.Users.Add(user);
             

                await dbContext.SaveChangesAsync();
           

            return dbContext;

        }

        private async Task<IMapper> getMapper()
        {
            var mockMapper = new MapperConfiguration(cfg =>
            {
               cfg.AddProfile(new MapperConfing());

            });

            return mockMapper.CreateMapper();
        }

        private async Task<IConfiguration> getConfiguration() 
        {
            var confBuilder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();

            return confBuilder.Build();       
        }

        #endregion
        #region Tests
        [Fact]
        public async void UserService_GetAllUsers_ReturnsAllUsers()
        {
            var context = await GetDbContext();
            var mapper = await getMapper();
            var service = new UserService(context,mapper);

            
            var users = service.GetAllUsers();


            Assert.Equal(2, users.Count());
            Assert.IsType <List<UserDto>>(users);
        }

        [Fact]
        public async void RegisterService_Register_RegistersAUser()
        {
            var context = await GetDbContext();
            var mapper = await getMapper();

            var service = new Register(mapper,context);

            IPasswordHasher<UserDto> hasher = new PasswordHasher<UserDto>();

            var newUserDto = new UserDto()
            {
                UserName = "Djurica",
                OIB = 12345678913,
                FirstName = "Djuro",
                LastName = "Djuric",
                Photo = "http://blabla.hr",
                PhoneNumber = "09245679812",
                Email = "djurohej@gmail.com",
                RoleId = 2,
                Confirmed = false,
                Password = ""
            };

            newUserDto.Password = hasher.HashPassword(newUserDto, "P@ssword4");

            var checkUserDto = await service.Registration(newUserDto);

            var numberOfUsers = context.Users.Count();

            Assert.Equal(3, numberOfUsers);
            Assert.IsType<UserDto>(checkUserDto);
        }

        [Fact]
        public async void LoginService_Login_UserSuccesfullyLoggedIn()
        {
            var context = await GetDbContext();
            var configuration = await getConfiguration();

            var service = new Login(context,configuration);

            var token =  await service.LogIn(new Backend.Data.Login.LoginDto
            {
                Email = "admin@fer.hr",
                Password = "P@ssword1"
            });

            var handler = new JwtSecurityTokenHandler();

            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            Assert.IsType<JwtSecurityToken>(jsonToken);

        }

    #endregion
    }
}
