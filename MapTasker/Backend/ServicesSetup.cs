using Backend.Services.Implementations;
using Backend.Services.Interfaces;
using System.Runtime.CompilerServices;

namespace Backend
{
    public static class ServicesSetup
    {
        public static void AddServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IUserService, UserService>();
        }
    }
}
