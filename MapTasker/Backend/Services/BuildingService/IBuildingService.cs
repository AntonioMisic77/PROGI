
using Backend.Data.BuildingDtos;

namespace Backend.Services.BuildingService
{
    public interface IBuildingService
    {
        Task<CreateBuildingDto[]> CreateBuilding(int BlockId, CreateBuildingDto[] dtos, long requesterOib);

        Task<BuildingDto> UpdateBuildingStatus(BuildingDto building);
    }
}
