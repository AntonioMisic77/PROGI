
using Backend.Data.MissingReportDTO;
using System.Security.Policy;
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

        public ActionResult<List<MissingReportDto>> GetAllMissingReports()
        {
            try
            {
                return Ok(_missingReportService.GetAllMissingReports());
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]

        public async Task<ActionResult<MissingReportDto>> CreateMissingReport(MissingReportDto dto)
        {
            try
            {
                return Ok(await _missingReportService.CreateMissingReport(dto));
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]

        public async Task<ActionResult<MissingReportDto>> UpdateMissingReport(MissingReportDto dto)
        {
            try
            {
                return Ok(await _missingReportService.UpdateMissingReport(dto));
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete]

        public async Task<ActionResult<List<MissingReportDto>>> DeleteMissingReport(int id)
        {
            try
            {
                return Ok(await _missingReportService.DeleteMissingReport(id));
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}

