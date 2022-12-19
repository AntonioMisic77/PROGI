using AutoMapper;
using Backend.Data.CommentDto;
using Backend.Data.MissingReportDTO;
using Backend.Data.Register;
using Backend.Models;

namespace Backend.Configuration
{
    public class MapperConfing : Profile
    {

        public MapperConfing()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<MissingReport, MissingReportDto>().ReverseMap();
            CreateMap<Comment, CommentDto>().ReverseMap();
        }
    }
}
