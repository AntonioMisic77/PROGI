using Backend.Data.CommentDto;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services.Comment
{
    public interface IComment
    {
        Task<ActionResult<CommentDto>> CreateComment();

        Task<ActionResult<CommentDto>> DeleteComment(int id);
    }
}
