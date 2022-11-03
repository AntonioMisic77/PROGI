using Backend.Services.Implementations;
using Backend.Services.Interfaces;
using Backend.Services.SeedDb;

namespace Backend
{
    public static class ServicesSetup
    {
        public static void AddServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IUserService, UserService>();
            serviceCollection.AddTransient<IDbSeeder, DbSeeder>();
        }
    }
}
