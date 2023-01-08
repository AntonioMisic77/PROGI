
using Backend.Data.BuildingDtos;

namespace Backend.Services.BuildingService
{
    public interface IBuildingService
    {
        Task<GetBuildingDto[]> CreateBuilding(int BlockId, CreateBuildingDto[] dtos, long requesterOib);

        Task<BuildingStatusDto> UpdateBuildingStatus(BuildingStatusDto building, long requesterOib);
    }
}
