
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
        public async Task<GetBlockDto[]> CreateBlock(int regionId, CreateBlockDto[] dtos, long requesterOib)
        {
            GetBlockDto[] result = new GetBlockDto[dtos.Length];

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

            int blockCount = 0;

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

                result[blockCount] = new GetBlockDto
                {
                    Id = newBlock.AreaId,
                    RegionId = newBlock.RegionId,
                    Status = newBlock.Status,
                    Points = block.Points.ToList(),
                };

                blockCount++;
            }
         
            await _context.SaveChangesAsync();

            return result; 

        }

        public async Task<BlockStatusDto> UpdateBlockStatus(BlockStatusDto dto, long requesterOib)
        {
            var block = _context.Blocks.Find(dto.BlockId);
            if (block == null)
            {
                throw new InvalidDataException("Ne postoji blok s tim id-om.");
            }
            var area = _context.Areas.Find(block.AreaId);
            var user = _context.Users.Find(requesterOib);

            var role = _context.Roles.Find(user.RoleId);

            if (role == null || (role.Name != "Admin" && role.Name != "Kartograf"))
            {
                throw new InvalidDataException("Osoba nije ni admin ni kartograf.");
            }

            if (!dto.Status.Equals("Aktivan") && !dto.Status.Equals("Nezapočet") && !dto.Status.Equals("Provjera") && !dto.Status.Equals("Završen"))
            {
                throw new InvalidDataException("Krivi status bloka unesen.");
            }

            if (dto.Status.Equals("Aktivan"))
            {
                block.ActiveForOib = requesterOib;
            } else
            {
                block.ActiveForOib = null;
            }

            if (dto.Status.Equals("Završen") && (!block.Status.Equals("Provjera") || area.UpdatedLastByOib != requesterOib))
            {
                throw new Exception("Blok nije u stanju provjera ili ga nisu provjerila barem dva kartografa."); 
            }

            if (dto.Status.Equals("Završen"))
            {
                area.ClosedAt = DateTime.Now;
            }
            
            block.Status = dto.Status;
            area.UpdatedLastByOib = requesterOib;

            await _context.Blocks.AddAsync(block);
            await _context.Areas.AddAsync(area);

            await _context.SaveChangesAsync();

            return dto; 


        }
    }
}
