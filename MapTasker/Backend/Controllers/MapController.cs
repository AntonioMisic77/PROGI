
using Backend.Data.RegionDTO;
using Backend.Data.Register;
using Backend.Services.Region;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly IRegion _regionService;

        public MapController(IRegion regionService)
        {
            _regionService = regionService;
        }

        [HttpGet]

        public async Task<ActionResult<List<RegionDto>>> getMap()
        {
            try
            {
                return Ok(await _regionService.getAllRegions());
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
            
        }
    }
}
