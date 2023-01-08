
using Backend.Data.BuildingDtos;
using Backend.Models;
using Backend.Services.BuildingService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingController : ControllerBase
    {
        private readonly IBuildingService _buildingService;

        public BuildingController(IBuildingService buildingService)
        {
            _buildingService = buildingService;
        }

        [HttpPost]

        public async Task<ActionResult<CreateBuildingDto[]>> CreateBuilding(int blockId, CreateBuildingDto[] building)
        {
            try
            {
                long oib = UserController.getRequesterOib(Request);
                return Ok(await _buildingService.CreateBuilding(blockId, building, oib)); 
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }


        [HttpPut]

        public async Task<ActionResult<BuildingStatusDto>> UpdateBuildingStatus(BuildingStatusDto building)
        {
            long oib = UserController.getRequesterOib(Request);
            return await _buildingService.UpdateBuildingStatus(building, oib);
        }
    }
}
