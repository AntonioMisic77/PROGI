
using Backend.Data.OperationDTO;
using Backend.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Services.IdGenerator;

namespace Backend.Services.Operation
{
    public class Operation : IOperation
    {
        private readonly IMapper _mapper;
        private readonly MapTaskerDBContext _context;
        private readonly IGenerator _generator;

        public Operation(IMapper mapper, MapTaskerDBContext context, IGenerator generator)
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
            if (role.Name != "Leader" || role.Name != "Voditelj") 
            {
                throw new Exception("Osoba nije voditelj grupe"); 
            }


            var operation = new Backend.Models.Operation() 
            { 
                Id = _generator.generateId(),
                Status = dto.Status,
                LeaderOib = dto.LeaderOib,
            };
            
            await _context.AddAsync(operation);
        

            foreach (var region in dto.Regions)
            {
                var area = new Backend.Models.Area()
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
                    var newPoint = new Backend.Models.Point()
                    {
                        Id = _generator.generateId(),
                        Latitude = point.Item1,
                        Longitude = point.Item2,
                        AreaId = area.Id,
                        OrderNumber = i,
                    };
                    await _context.Points.AddAsync(newPoint);
                    area.Points.Add(newPoint);
                }

                
                var newRegion = new Backend.Models.Region()
                {
                    AreaId = area.Id,
                    OperationId = operation.Id,
                };
                operation.Regions.Add(newRegion);
            }
            await _context.SaveChangesAsync();

            return _mapper.Map<OperationDto>(operation);
        }

        public async Task<OperationDto> UpdateOperation(OperationDto dto)
        {
   
            var operation = await _context.Operations.FirstOrDefaultAsync(a => a.Id == dto.Id); 

            if (operation == null)
            {
                throw new Exception("Ne postoji operacija s tim id-om.");
            }

            operation.Status = dto.Status;
            operation.LeaderOib = dto.LeaderOib;
            
            _context.Attach(operation); 
            _context.Entry(operation).State = EntityState.Modified; 
            await _context.SaveChangesAsync(); 

            foreach(var region in dto.Regions)
            {
                var newRegion = _context.Regions.FirstOrDefault(a => a.AreaId == region.AreaId); 

                if(newRegion == null)
                {
                    newRegion = new Backend.Models.Region()
                    {
                        AreaId = region.AreaId,
                        OperationId = region.OperationId,
                    };
                    _context.Regions.Add(newRegion);
                } else
                {
                     newRegion.OperationId = region.OperationId;
                }
                foreach (var block in region.Blocks)
                {
                    var newBlock = _context.Blocks.FirstOrDefault(a => a.AreaId == block.AreaId);

                    if (newBlock == null)
                    {
                        newBlock = new Backend.Models.Block()
                        {
                            AreaId = block.AreaId,
                            Status = block.Status,
                            RegionId = block.RegionId,
                            ActiveForOib = block.ActiveForOib,
                        };
                        _context.Blocks.Add(newBlock);
                    } else
                    {
                        newBlock.Status = block.Status;
                        newBlock.RegionId = block.RegionId;
                        newBlock.ActiveForOib = block.ActiveForOib;
                    }
                    foreach (var building in block.Buildings)
                    {
                        var newBuilding = _context.Buildings.FirstOrDefault(a => a.AreaId == building.AreaId);
                        
                        if(newBuilding == null)
                        {
                            newBuilding = new Backend.Models.Building()
                            {
                                AreaId = building.AreaId,
                                BlockId = building.BlockId,
                                Status = building.Status,
                            };
                            _context.Buildings.Add(newBuilding);
                        } else
                        {
                            newBuilding.BlockId = building.BlockId;
                            newBuilding.Status = building.Status;
                        }

                    }
                }
            }
            


            

            return _mapper.Map<OperationDto>(operation); 
        }
    }
}
