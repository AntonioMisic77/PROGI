using Backend.Data.Region;

namespace Backend.Services.Region
{
    public interface IRegion
    {
        Task<List<RegionDto>> getAllRegions();
    }
}
