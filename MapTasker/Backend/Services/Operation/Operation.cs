
using Backend.Data.OperationDTO;

namespace Backend.Services.Operation
{
    public class Operation : IOperation
    {
        public Task<OperationDto> CreateOperation(OperationDto operation)
        {
            throw new NotImplementedException();
        }

        public Task<OperationDto> UpdateOperationStatus(OperationDto operation)
        {
            throw new NotImplementedException();
        }
    }
}
