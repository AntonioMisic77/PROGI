
using AutoMapper;
using Backend.Data;
using Backend.Data.BlockDtos;
using Backend.Models;
using Backend.Services.IdGenerator;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services.BlockService
{
    public class BlockService : IBlockService
    {
        private readonly IMapper _mapper;
        private readonly MapTaskerDBContext _context;
        private readonly IGenerator _generator;

        public BlockService(IMapper mapper, MapTaskerDBContext context, IGenerator generator)
        {
            _mapper = mapper;
            _context = context;
            _generator = generator;
        }
        public async Task<CreateBlockDto[]> CreateBlock(int regionId, CreateBlockDto[] dtos, long requesterOib)
        {
            var region = _context.Regions.Find(regionId); 
            if (region == null)
            {
                throw new InvalidDataException("Ne postoji regija s navedenim id-om.");
            }
            var user = _context.Users.Find(requesterOib);
          
            var role = _context.Roles.Find(user.RoleId);

            if (role == null || (role.Name != "Admin" && role.Name != "Kartograf"))
            {
                throw new InvalidDataException("Osoba nije ni admin ni kartograf.");
            }

            foreach (var block in dtos)
            {
                var area = new Area()
                {
                    Id = _generator.generateId(),
                    CreatedAt = DateTime.Now,
                    UpdatedLastByOib = requesterOib,
                };
                await _context.AddAsync(area);

                int i = 0; 
                foreach (var point in block.Points)
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
                var newBlock = new Block
                {
                    AreaId = area.Id,
                    Status = "Nezapočeto",
                    RegionId = regionId,
                };
                region.Blocks.Add(newBlock);
                await _context.Blocks.AddAsync(newBlock); 
            }
         
            await _context.SaveChangesAsync();

            return dtos; 

        }
        public Task<ActionResult<BlockDto>> UpdateBlock(BlockDto block)
        {
            throw new NotImplementedException();
        }

        public Task<BlockDto> UpdateBlockStatus(BlockDto block, long requesterOib)
        {
            throw new NotImplementedException();
        }
    }
}
