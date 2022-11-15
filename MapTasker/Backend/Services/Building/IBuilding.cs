using Backend.Data.Building;

namespace Backend.Services.Building
{
    public interface IBuilding
    {
        Task<BuildingDto> CreateBuilding(BuildingDto building);

        Task<BuildingDto> UpdateBuildingStatus(BuildingDto building);
    }
}
