using AutoMapper;
using Backend.Data;
using Backend.Data.CommentDto;
using Backend.Services.IdGenerator;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services.Comment
{
    public class Comment : IComment
    {

        private MapTaskerDBContext _context;
        private readonly IMapper _mapper;
        private readonly IGenerator _generator;

        public Comment(MapTaskerDBContext context, IMapper mapper, IGenerator generator)
        {
            _context = context;
            _mapper = mapper;
            _generator = generator;
        }
        public async Task<CommentDto> CreateComment(CommentDto dto)
        {
            var comment = new Models.Comment
            {
                Id = _generator.generateId(),
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
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return null;
            }

            _context.Remove(comment);

            await _context.SaveChangesAsync();

            return _mapper.Map<CommentDto>(comment);
        }

        public async Task<CommentDto> UpdateComment(CommentDto dto)
        {
            var comment = await _context.Comments.FindAsync(dto.Id);

            if (comment == null)
            {
                throw new InvalidDataException("No such comment");
            }

            comment.Text = dto.Text;

            _context.Attach(comment);
            _context.Entry(comment).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

            await _context.SaveChangesAsync();

            return _mapper.Map<CommentDto>(comment);
        }
    }
}
