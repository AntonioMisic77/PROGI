
using Backend.Data.RegionDTO;

namespace Backend.Services.Region
{
    public class Region : IRegion
    {
        private readonly IMapper _mapper;
        private readonly MapTaskerDBContext _context;

        public Operation(IMapper mapper, MapTaskerDBContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<RegionDto>> getAllRegions()
        {
            var regions = await _context.Regions.ToListAsync();

            return _mapper.Map<IList<RegionDto>>(regions);
        }
    }
}
