
using Backend.Data.StatisticDto;

namespace Backend.Services.Statistic
{
    public interface IStatistic
    {
        Task<StatisticDto> getStatistics();
    }
}
