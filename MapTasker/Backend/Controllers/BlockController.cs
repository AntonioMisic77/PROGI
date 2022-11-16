
using Backend.Data.BlockDTO;
using Backend.Services.Block;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlockController : ControllerBase
    {
        private readonly IBlock _blockService;

        public BlockController(IBlock blockService)
        {
            _blockService = blockService;
        }

        [HttpPut]

        public async  Task<ActionResult<BlockDto>> UpdateBlock(BlockDto block)
        {
            return await _blockService.UpdateBlockStatus(block);
        }

    }
}
