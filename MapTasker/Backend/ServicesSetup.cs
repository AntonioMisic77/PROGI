using Backend.Configuration;
using Backend.Services.Implementations;
using Backend.Services.Interfaces;
using Backend.Services.Login;
using Backend.Services.Registration;
using Backend.Services.SeedDb;

namespace Backend
{
    public static class ServicesSetup
    {
        public static void AddServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddAutoMapper(typeof(MapperConfing));
            serviceCollection.AddTransient<IUserService, UserService>();
            serviceCollection.AddTransient<IDbSeeder, DbSeeder>();
            serviceCollection.AddTransient<ILogin, Login>();
            serviceCollection.AddTransient<IRegister, Register>();
        }
    }
}
