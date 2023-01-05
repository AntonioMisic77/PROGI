
using Backend.Data.OperationDtos;
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

        public async Task<OperationDto> UpdateOperation(OperationStatusDto dto)
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


            return _mapper.Map<OperationDto>(operation); 
        }
    }
}
