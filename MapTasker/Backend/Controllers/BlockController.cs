﻿using Backend.Data.BlockDtos;
using Backend.Data.OperationDtos;
using Backend.Services.BlockService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlockController : ControllerBase
    {
        private readonly IBlockService _blockService;

        public BlockController(IBlockService blockService)
        {
            _blockService = blockService;
        }

        [HttpPost]
        public async Task<ActionResult<CreateBlockDto[]>> CreateBlock(int regionId, CreateBlockDto[] block)
        {
            try
            {
                long oib = UserController.getRequesterOib(Request);
                return Ok(await _blockService.CreateBlock(regionId, block, oib));
            } catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]

        public async Task<ActionResult<BlockDto>> UpdateBlockStatus(BlockDto block)
        {
            try
            {
                long oib = UserController.getRequesterOib(Request);
                return Ok(await _blockService.UpdateBlockStatus(block, oib));
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
