
using Backend.Data.Areas;
using Backend.Data.OperationDtos;

namespace Backend.Services.OperationService
{
    public interface IOperationService
    {
        Task<OperationDto> CreateOperation(OperationDto operation);
        AllAreasDto GetAllAreas();
        Task<OperationStatusDto> UpdateOperation(OperationStatusDto operation);
    }
}
