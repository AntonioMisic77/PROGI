
using Backend.Data.BlockDTO;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services.Block
{
    public interface IBlock
    {
        Task<BlockDto> UpdateBlockStatus(BlockDto block);
        Task<ActionResult<BlockDto>> UpdateBlock(BlockDto block);
    }
}
