
using Backend.Data.Areas;
using Backend.Data.OperationDtos;
using Backend.Data.UserDtos;
using Backend.Services.OperationService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationController : ControllerBase
    {
        private readonly IOperationService _operationService;

        public OperationController(IOperationService operationService)
        {
            _operationService = operationService;
        }

        [HttpPost]

        public async Task<ActionResult<OperationDto>> CreateOperation(OperationDto operation)
        {
            try
            {
                return Ok(await _operationService.CreateOperation(operation));
            } 
            catch (Exception e) 
            { 
                 return BadRequest(e);
            }
           
        }

        [HttpPut]

        public async Task<ActionResult<OperationDto>> UpdateOperation(OperationStatusDto operation)
        {   
            try
            {
                 return Ok(await _operationService.UpdateOperation(operation));
            } 
            catch (Exception e) 
            { 
                 return BadRequest(e);
            }
           
        }

        [HttpGet]
        public ActionResult<AllAreasDto> GetAllAreas()
        {
            return Ok(_operationService.GetAllAreas());
        }
    }
}
