
using Backend.Data.BlockDTO;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services.Block
{
    public class Block : IBlock
    {
        public Task<ActionResult<BlockDto>> UpdateBlock(BlockDto block)
        {
            throw new NotImplementedException();
        }

        public Task<BlockDto> UpdateBlockStatus(BlockDto block)
        {
            throw new NotImplementedException();
        }
    }
}
