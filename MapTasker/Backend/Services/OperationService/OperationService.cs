
using Backend.Data.OperationDtos;
using Backend.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Backend.Data.Areas;
using Backend.Data.BlockDtos;
using Backend.Data.RegionDtos;
using Backend.Data.BuildingDtos;
using Backend.Data.PointDtos;
using Backend.Models;
using Backend.Services.IdGenerator;

namespace Backend.Services.OperationService
{
    public class OperationService : IOperationService
    {
        private readonly IMapper _mapper;
        private readonly MapTaskerDBContext _context;
        private readonly IGenerator _generator;

        public OperationService(IMapper mapper, MapTaskerDBContext context, IGenerator generator)
        {
            _mapper = mapper;
            _context = context;
            _generator = generator;
        }

        public async Task<OperationDto> CreateOperation(OperationDto dto)
        {
            
            var user = _context.Users.Find(dto.LeaderOib); 
            if (user == null)
            {
                throw new InvalidDataException("Ne postoji osoba s navedenim OIB-om"); 
            }

            var role = _context.Roles.Find(user.RoleId);
            
            if (role == null || (role.Name != "Admin" && role.Name != "Voditelj")) 
            {
                throw new InvalidDataException("Osoba nije voditelj grupe"); 
            }

            var operation = new Operation()
            {
                Name = dto.Name,
                Id = _generator.generateId(),
                Status = "Active",
                LeaderOib = dto.LeaderOib,
            };

            await _context.AddAsync(operation);

            foreach (var region in dto.Regions)
            {
                var area = new Area()
                {
                    Id = _generator.generateId(),
                    CreatedAt = DateTime.Now,
                    UpdatedLastByOib = dto.LeaderOib,
                };
                await _context.AddAsync(area);

                int i = 0;
                foreach(var point in region.Coordinates)
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
                
                var newRegion = new Region()
                {
                    AreaId = area.Id,
                    OperationId = operation.Id,
                };
                
                operation.Regions.Add(newRegion);
                await _context.Regions.AddAsync(newRegion);
            }
            await _context.SaveChangesAsync();

            return dto;
        }

        public AllAreasDto GetAllAreas()
        {
            List<GetOperationDto> operationDtos = new List<GetOperationDto>();
            List<GetRegionDto> regionDtos = new List<GetRegionDto>();
            List<GetBlockDto> blockDtos = new List<GetBlockDto>();
            List<GetBuildingDto> buildingDtos = new List<GetBuildingDto>();

            var operations = _context.Operations.ToList();

            foreach (var operation in operations)
            {
                operationDtos.Add(new GetOperationDto
                {
                    Id = operation.Id,
                    Name = operation.Name,
                    LeaderOib = operation.LeaderOib,
                    Status = operation.Status,
                });
            }

            var regions = _context.Regions.ToList();

            foreach (var region in regions)
            {
                var points = _context.Points.Where(p => p.AreaId == region.AreaId)
                                            .OrderBy(p => p.OrderNumber)
                                            .Select(p => new PointDto { Latitude = p.Latitude, Longitude = p.Longitude})
                                            .ToList();

                regionDtos.Add(new GetRegionDto
                {
                    OperationId = region.OperationId,
                    Id = region.AreaId,
                    Points = points,
                });
            }

            var blocks = _context.Blocks.ToList();

            foreach (var block in blocks)
            {
                var points = _context.Points.Where(p => p.AreaId == block.AreaId)
                                            .OrderBy(p => p.OrderNumber)
                                            .Select(p => new PointDto { Latitude = p.Latitude, Longitude = p.Longitude })
                                            .ToList();

                blockDtos.Add(new GetBlockDto
                {
                    RegionId = block.RegionId,
                    Id = block.AreaId,
                    Points = points,
                    Status = block.Status,
                });
            }

            var buildings = _context.Buildings.ToList();

            foreach (var building in buildings)
            {
                var points = _context.Points.Where(p => p.AreaId == building.AreaId)
                                            .OrderBy(p => p.OrderNumber)
                                            .Select(p => new PointDto { Latitude = p.Latitude, Longitude = p.Longitude })
                                            .ToList();

                buildingDtos.Add(new GetBuildingDto
                {
                    BlockId = building.BlockId,
                    Id = building.AreaId,
                    Points = points,
                    Status = building.Status,
                });
            }

            return new AllAreasDto
            {
                Operations = operationDtos,
                Regions = regionDtos,
                Blocks = blockDtos,
                Buildings = buildingDtos,

            };
        }

        public async Task<OperationStatusDto> UpdateOperation(OperationStatusDto dto)
        {
   
            var operation = await _context.Operations.FirstOrDefaultAsync(a => a.Id == dto.OperationId); 

            if (operation == null)
            {
                throw new Exception("Ne postoji operacija s tim id-om.");
            }

            if (operation.LeaderOib != dto.LeaderOib)
            {
                throw new Exception("Osoba nije voditelj operacije.");
            }

            operation.Status = dto.Status;

            
            _context.Attach(operation); 
            _context.Entry(operation).State = EntityState.Modified; 
            await _context.SaveChangesAsync(); 


            return _mapper.Map<OperationStatusDto>(operation); 
        }
    }
}
