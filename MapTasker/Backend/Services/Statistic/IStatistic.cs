using Backend.Data.Statistic;

namespace Backend.Services.Statistic
{
    public interface IStatistic
    {
        Task<StatisticDto> getStatistics();
    }
}
