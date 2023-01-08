
using Backend.Data.RegionDtos;

namespace Backend.Services.RegionService
{
    public interface IRegionService
    {
        Task<List<RegionDto>> getAllRegions();
    }
}
