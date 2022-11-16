using System.Security.Policy;
using Backend.Data.MissingReportDto;
using Backend.Data.Register;
using Backend.Models;
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

        [HttpPost]

        public async Task<ActionResult<List<MissingReportDto>>> CreateMissingReport()
        {
            return await _missingReportService.CreateMissingReport();
        }

        [HttpPut]

        public async Task<ActionResult<List<MissingReportDto>>> UpdateMissingReport(MissingReportDto dto)
        {
            return await _missingReportService.UpdateMissingReport(dto);
        }

        [HttpDelete]

        public async Task<ActionResult<List<MissingReportDto>>> DeleteMissingReport(int id)
        {
            return await _missingReportService.DeleteMissingReport(id);
        }
    }
}

