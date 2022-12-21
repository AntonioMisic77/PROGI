
using Backend.Data.OperationDTO;

namespace Backend.Services.Operation
{
    public interface IOperation
    {
        Task<OperationDto> CreateOperation(OperationDto operation);

        Task<OperationDto> UpdateOperation(OperationDto operation);
    }
}
