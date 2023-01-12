using Backend.Data.UserDtos;
using Backend.Data.StatisticDto;
using Backend.Services.StatisticsService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet]

        public ActionResult<StatisticDto> getStatistics()
        {
            return Ok(_statisticsService.getStatistics());
        }
    }
}
