
using Backend.Data.RegionDtos;
using Backend.Data.UserDtos;
using Backend.Services.RegionService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly IRegionService _regionService;

        public MapController(IRegionService regionService)
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
