using Backend.Data.Block;
using Backend.Data.Building;
using Backend.Services.Building;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingController : ControllerBase
    {
        private readonly IBuilding _buildingService;

        public BuildingController(IBuilding buildingService)
        {
            _buildingService = buildingService;
        }

        [HttpPost]

        public async Task<ActionResult<BuildingDto>> CreateBuilding(BuildingDto building)
        {
            return await _buildingService.CreateBuilding(building);
        }


        [HttpPut]

        public async Task<ActionResult<BuildingDto>> UpdateBuilding(BuildingDto building)
        {
            return await _buildingService.UpdateBuildingStatus(building);
        }
    }
}
