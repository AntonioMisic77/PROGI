using Backend.Data.CommentDto;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services.Comment
{
    public interface IComment
    {
        Task<CommentDto> CreateComment(CommentDto dto);

        Task<CommentDto> DeleteComment(int id);
    }
}
