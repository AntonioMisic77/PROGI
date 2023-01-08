
using AutoMapper;
using Backend.Data;
using Backend.Data.BuildingDtos;
using Backend.Models;
using Backend.Services.IdGenerator;

namespace Backend.Services.BuildingService
{
    public class BuildingService : IBuildingService
    {
        private readonly IMapper _mapper;
        private readonly MapTaskerDBContext _context;
        private readonly IGenerator _generator;

        public BuildingService(IMapper mapper, MapTaskerDBContext context, IGenerator generator)
        {
            _mapper = mapper;
            _context = context;
            _generator = generator;
        }
        public async Task<CreateBuildingDto[]> CreateBuilding(int BlockId, CreateBuildingDto[] dtos, long requesterOib)
        {
            var block = _context.Blocks.Find(BlockId);
            if (block == null)
            {
                throw new InvalidDataException("Ne postoji blok s navedenim id-om."); 
            }
            var user = _context.Users.Find(requesterOib);

            var role = _context.Roles.Find(user.RoleId);

            if (role == null || (role.Name != "Admin" && role.Name != "Kartograf"))
            {
                throw new InvalidDataException("Osoba nije ni admin ni kartograf.");
            }
            if (requesterOib != block.ActiveForOib)
            {
                throw new Exception("Nije dopušteno kreiranje građevina."); 
            }
            foreach (var building in dtos)
            {
                var area = new Area()
                {
                    Id = _generator.generateId(),
                    CreatedAt = DateTime.Now,
                    UpdatedLastByOib = requesterOib,
                };
                await _context.AddAsync(area);

                int i = 0;
                foreach (var point in building.Points)
                {
                    i++;
                    var newPoint = new Point()
                    {
                        Id = _generator.generateId(),
                        Latitude = point.Latitude,
                        Longitude = point.Longitude,
                        AreaId = area.Id,
                        OrderNumber = i,
                    };
                    await _context.Points.AddAsync(newPoint);
                    area.Points.Add(newPoint);
                }
                var newBuilding = new Building
                {
                    AreaId = area.Id,
                    BlockId = BlockId,
                    Status = "Nepretraženo",
                };
                block.Buildings.Add(newBuilding);
                await _context.Buildings.AddAsync(newBuilding);

            }

            await _context.SaveChangesAsync();

            return dtos;
            
        }

        public Task<BuildingDto> UpdateBuildingStatus(BuildingDto building)
        {
            throw new NotImplementedException();
        }
    }
}
