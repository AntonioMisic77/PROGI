using Backend.Data.Block;

namespace Backend.Services.Block
{
    public interface IBlock
    {
        Task<BlockDto> UpdateBlockStatus(BlockDto block);
 
    }
}
