using Backend.Configuration;
using Backend.Services.Block;
using Backend.Services.Building;
using Backend.Services.Comment;
using Backend.Services.IdGenerator;
using Backend.Services.Implementations;
using Backend.Services.Interfaces;
using Backend.Services.Login;
using Backend.Services.MissingReport;
using Backend.Services.OperationService;
using Backend.Services.RegionService;
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
            serviceCollection.AddTransient<IRegionService, RegionService>();
            serviceCollection.AddTransient<IOperationService, OperationService>();
            serviceCollection.AddTransient<IBlock, Block>();
            serviceCollection.AddTransient<IBuilding,Building>();
            serviceCollection.AddTransient<IStatistic,Statistics>();
            serviceCollection.AddTransient<IMissingReport,MissingReport>();
            serviceCollection.AddTransient<IComment, Comment>();
            serviceCollection.AddTransient<IGenerator,IdGenerator>();
        }
    }
}
