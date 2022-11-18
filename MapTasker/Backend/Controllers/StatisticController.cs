using Backend.Data.Register;
using Backend.Data.StatisticDto;
using Backend.Services.Statistic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly IStatistic _statisticsService;

        public StatisticController(IStatistic statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet]

        public async Task<ActionResult<StatisticDto>> getStatistics()
        {
            return await _statisticsService.getStatistics();
        }
    }
}
