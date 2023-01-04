using Backend.Data.CommentDto;
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
        public async Task<ActionResult<CommentDto>> CreateComment(CommentDto dto)
        {
            try
            {
                return Ok(await _commentService.CreateComment(dto));
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<CommentDto>> DeleteComment(int id)
        {
            try
            {
                return Ok(await _commentService.DeleteComment(id));
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        public async Task<ActionResult<CommentDto>> UpdateComment(CommentDto dto)
        {
            try
            {
                return Ok(await _commentService.UpdateComment(dto));
            }
            catch (Exception e)
            {

                return BadRequest(e);
            }
        }
    }


}
