
using Backend.Data.RegionDTO;

namespace Backend.Services.Region
{
    public interface IRegion
    {
        Task<List<RegionDto>> getAllRegions();
    }
}
