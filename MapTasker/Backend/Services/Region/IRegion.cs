
using Backend.Data.RegionDtos;

namespace Backend.Services.Region
{
    public interface IRegion
    {
        Task<List<RegionDto>> getAllRegions();
    }
}
