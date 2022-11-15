using Backend.Data.Comment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Services.Comment;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IComment _commentService;

        public CommentController(IComment commentService)
        {
            _commentService = commentService;
        }

        [HttpPost]
        public async Task<ActionResult<CommentDto>> CreateComment()
        {
            return await _commentService.CreateComment();
        }

        [HttpDelete]

        public async Task<ActionResult<CommentDto>> DeleteComment(int id)
        {
            return await _commentService.DeleteComment(id);
        }
    }


}
