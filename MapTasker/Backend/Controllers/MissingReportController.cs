using Backend.Data.MissingReport;
using Backend.Data.Register;
using Backend.Services.MissingReport;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissingReportController : ControllerBase
    {
        private readonly IMissingReport _missingReportService;

        public MissingReportController(IMissingReport missingReportService)
        {
            _missingReportService = missingReportService;
        }

        [HttpGet]

        public async Task<ActionResult<List<MissingReportDto>>> GetAllMissingReports()
        {
            return await _missingReportService.GetAllMissingReports();
        }
    }
}
