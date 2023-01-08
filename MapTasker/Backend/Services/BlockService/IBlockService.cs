
using Backend.Data.BlockDtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services.BlockService
{
    public interface IBlockService
    {
        Task<CreateBlockDto[]> CreateBlock(int RegionId, CreateBlockDto[] dtos, long requesterOib); 
        Task<BlockStatusDto> UpdateBlockStatus(BlockStatusDto block, long requesterOib);
        Task<ActionResult<BlockDto>> UpdateBlock(BlockDto block);
    }
}
