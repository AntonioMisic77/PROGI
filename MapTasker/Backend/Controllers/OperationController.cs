using Backend.Data.Operation;
using Backend.Data.Register;
using Backend.Services.Operation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationController : ControllerBase
    {
        private readonly IOperation _operationService;

        public OperationController(IOperation operationService)
        {
            _operationService = operationService;
        }

        [HttpPost]

        public async Task<ActionResult<OperationDto>> CreateOperation(OperationDto operation)
        {
            return await _operationService.CreateOperation(operation);
        }

        [HttpPut]

        public async Task<ActionResult<OperationDto>> UpdateOperation(OperationDto operation)
        {
            return await _operationService.UpdateOperationStatus(operation);
        }
    }
}
