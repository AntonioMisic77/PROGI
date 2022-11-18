using Backend.Configuration;
using Backend.Services.Block;
using Backend.Services.Building;
using Backend.Services.Comment;
using Backend.Services.Implementations;
using Backend.Services.Interfaces;
using Backend.Services.Login;
using Backend.Services.MissingReport;
using Backend.Services.Operation;
using Backend.Services.Region;
using Backend.Services.Registration;
using Backend.Services.SeedDb;
using Backend.Services.Statistic;

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
            serviceCollection.AddTransient<IMissingReport,MissingReport>();
            serviceCollection.AddTransient<IRegion, Region>();
            serviceCollection.AddTransient<IOperation, Operation>();
            serviceCollection.AddTransient<IBlock, Block>();
            serviceCollection.AddTransient<IBuilding,Building>();
            serviceCollection.AddTransient<IStatistic,Statistics>();
            serviceCollection.AddTransient<IMissingReport,MissingReport>();
            serviceCollection.AddTransient<IComment, Comment>();
        }
    }
}
