
using Backend.Data.OperationDtos;

namespace Backend.Services.Operation
{
    public interface IOperation
    {
        Task<OperationDto> CreateOperation(OperationDto operation);

        Task<OperationDto> UpdateOperation(OperationStatusDto operation);
    }
}
