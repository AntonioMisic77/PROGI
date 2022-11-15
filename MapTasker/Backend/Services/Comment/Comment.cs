using Backend.Data.Comment;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services.Comment
{
    public class Comment : IComment
    {
        public Task<ActionResult<CommentDto>> CreateComment()
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult<CommentDto>> DeleteComment(int id)
        {
            throw new NotImplementedException();
        }
    }
}
