using Backend.Data.Region;
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
            return await _regionService.getAllRegions();
        }
    }
}
