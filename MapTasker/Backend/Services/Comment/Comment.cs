using AutoMapper;
using Backend.Data;
using Backend.Data.CommentDto;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services.Comment
{
    public class Comment : IComment
    {

        private MapTaskerDBContext _context;
        private readonly IMapper _mapper;

        public Comment(MapTaskerDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<CommentDto> CreateComment(CommentDto dto)
        {
            var comment = new Models.Comment
            {
                Id = dto.Id,
                ReportId = dto.ReportId,
                Text = dto.Text,
                UserOib = dto.UserOib
            };

            await _context.AddAsync(comment);
            await _context.SaveChangesAsync();


            return _mapper.Map<CommentDto>(comment);
        }

        public async Task<CommentDto> DeleteComment(int id)
        {
            var comment = _context.Comments.FindAsync(id);

            _context.Remove(comment);

            await _context.SaveChangesAsync();

            return _mapper.Map<CommentDto>(comment);
        }
    }
}
