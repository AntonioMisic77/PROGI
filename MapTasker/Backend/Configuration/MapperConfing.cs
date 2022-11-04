using AutoMapper;
using Backend.Data.Register;
using Backend.Models;

namespace Backend.Configuration
{
    public class MapperConfing : Profile
    {

        public MapperConfing()
        {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
